# Planning — Technical Improvements

Audit scoped to: scalability, readability, and "the site cannot break" QA mindset.
Wedding is **29 August 2026** — these recommendations are prioritised so the highest-risk items land before the site sees real traffic.

---

## 0. Open questions (need your input)

These judgment calls would change what gets built. Please skim and answer in the next turn.

1. **RSVP scope mismatch with [CLAUDE.md](CLAUDE.md):** the spec lists two fields that are not in [RsvpView.vue](src/views/RsvpView.vue):
   - "**Parteciperò:** Sì / No" — currently the form assumes attendance. No path to decline. Should we add it (with a "thanks anyway" branch), or update CLAUDE.md to reflect that the form is "confirmations only"?
   - "**Messaggio per Marta e Giacomo**" (optional textarea) — currently absent. Add it?
2. **Test strategy depth:** the site is mostly static. Highest-risk surface is RSVP → Netlify. Three sensible options:
   - **A. E2E only** — Playwright covering RSVP happy path + a handful of edge cases. Minimum viable safety net.
   - **B. E2E + unit tests for the RSVP component** (Vitest + Vue Test Utils). Covers conditional fields and dietary mutual exclusion in isolation.
   - **C. Full pyramid** — A + B + component tests for AppNav/WeddingTimeline + Lighthouse CI. Probably overkill for a one-day site.
   My recommendation: **B**. Tell me if you want A or C instead.
3. **Brand colour drift:** CLAUDE.md documents `#8599C5`, but [base.css](src/assets/base.css) actually defines `#8DA6D4` (matching the recent commit `style: update brand periwinkle to rgb(141 166 212)`). I'll treat the CSS as the source of truth and update CLAUDE.md — flag if that's wrong.
4. **PLANNING.md is gitignored.** That's fine for an internal scratch doc, but it means none of this can be tracked via PR. Want me to leave it local-only, or rename to e.g. `TODO.md` and start checking it in?

---

## 1. Critical — must land before guests start using the site

These can break the only interactive surface on the site (the RSVP form) or send guests to dead links.

### 1.1 Placeholder URLs in production code
Two `#…-placeholder` hrefs will ship to prod if forgotten:
- ~~[RegistryView.vue:3](src/views/RegistryView.vue) — `PAYPAL_URL` dummy value.~~ ✅ **Done 2026-06-12** — updated to `https://paypal.me/MartaZoeC`
- [RegistryView.vue:3](src/views/RegistryView.vue) — `IBAN`, `BANK_BENEFICIARY`, `BANK_CAUSALE` still dummy values.
- [AlbumView.vue:43](src/views/AlbumView.vue) — `#wedshoots-placeholder` href.

**Action:**
- Move these into a single `src/config/wedding.ts` (see §2.1).
- Add a runtime guard: in production builds, throw / log to console if any value starts with `#` or contains `placeholder`. Cheap and prevents an embarrassing launch bug.
- Add an `oxlint` / ESLint rule (or just a `grep` check in CI) that fails the build if `placeholder` strings remain.

### 1.2 RSVP — end-to-end Netlify submission test
The current PLANNING note already calls this out. Concretely:
- Confirm the static form in [index.html:21-37](index.html) declares **exactly** the same input names that [RsvpView.vue:93-111](src/views/RsvpView.vue) submits. They currently match — add a test that locks this in (see §7.1).
- Deploy preview → submit → verify the entry appears in Netlify Forms dashboard. Do this on a feature branch before merging.
- Test the spam honeypot: filling `bot-field` should cause Netlify to drop the submission silently.

### 1.3 RSVP — validation feedback
Today, if a required field is empty, the browser shows the native tooltip and that's it. Issues:
- The `has_children` radio group has `required` on each option; native validation works but the message is generic.
- No client-side validation for malformed numeric ages (e.g. negative, > 17, non-integer).
- No "you must answer all required questions" summary above the submit button — guests on mobile won't see where the error is.

**Action:** add a thin validation layer (no library needed) that:
- Computes a `errors` map from `form` + `guests` + `childrenAges`.
- Renders inline error text per field on submit attempt (no native popups — `novalidate` is already set, good).
- Scrolls to the first error.

### 1.4 RSVP — submit state machine
Today: `submitting`, `submitted`, `submitError` are three booleans/strings that can disagree (e.g. submit fails then succeeds — `submitError` still has stale text).

**Action:** collapse into a discriminated union:
```ts
type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }
```
Smaller surface area, impossible to render two states at once.

### 1.5 RSVP — stable `v-for` keys
[RsvpView.vue:189](src/views/RsvpView.vue) and [RsvpView.vue:272](src/views/RsvpView.vue) use the array index as `:key`. Removing a middle row makes Vue re-bind `v-model` to the wrong input, which has caused real RSVP-form bugs in other Vue apps.

**Action:** give each guest / child a stable `id` (e.g. `crypto.randomUUID()` on creation) and key by that.

### 1.6 Netlify security headers
There is no `netlify.toml` or `public/_headers`. The site embeds Google Maps iframes, so we want at minimum:
- `Content-Security-Policy` allowing `https://www.google.com` for frame-src, fonts.gstatic.com / fonts.googleapis.com for fonts.
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` denying camera/microphone/geolocation.

**Action:** add `netlify.toml` with a `[[headers]]` block.

---

## 2. Architecture — single source of truth

The site has ~6 routes, all touching the same dozen wedding facts. Right now those facts are scattered across templates.

### 2.1 `src/config/wedding.ts` — one place for every wedding fact
Today, the date `29 · 8 · 2026` is hardcoded in **6 places** (HomeView alt, AlbumView, LocationView, RegistryView, RsvpView, ScheduleView). Similarly: addresses in 3 places, times in 2 places, IBAN in 1, PayPal in 1, WedShoots link in 1.

**Action:** create:
```ts
// src/config/wedding.ts
export const WEDDING = {
  couple: { brideName: 'Marta', groomName: 'Giacomo' },
  date: new Date('2026-08-29T11:30:00+02:00'),
  rsvpDeadline: new Date('2026-07-31T23:59:59+02:00'),
  formattedDate: '29 · 8 · 2026',          // canonical UI string
  ceremony: {
    title: 'Cerimonia civile',
    time: '11:30',
    address: 'Via Mezzalunga, 2',
    city: '17015 Celle Ligure SV',
    mapsQuery: 'Via+Mezzalunga+2,+17015+Celle+Ligure+SV+Italia',
  },
  reception: { /* … */ },
  gifts: {
    paypal: 'https://paypal.me/…',
    bank: { iban: '…', beneficiary: '…', causale: '…' },
  },
  album: { wedshootsUrl: '…' },
} as const
```
Then derive Google Maps URLs with a tiny helper:
```ts
export const directionsUrl = (q: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${q}`
export const embedUrl = (q: string) =>
  `https://www.google.com/maps?q=${q}&output=embed`
```
Replaces ad-hoc URL strings in [LocationView.vue:23,36,53,67,95](src/views/LocationView.vue).

### 2.2 Extract `PageHeader.vue` (already in old PLANNING)
The `.page-header`/`.page-header-inner`/`.page-eyebrow`/`.page-title`/`.page-subtitle` block is copy-pasted across 5 views — same markup, ~50 lines of identical `<style scoped>`. CLAUDE.md already calls this pattern out and signals the lift was the planned next move.

**Action:** create `src/components/PageHeader.vue` with props `{ eyebrow, title, ariaLabel? }` and a default subtitle of `WEDDING.formattedDate`. Replace in all 5 views. Saves ~250 lines of CSS duplication and eliminates style drift.

### 2.3 Single colour-token source of truth
Brand colours live in both [base.css:4-9](src/assets/base.css) and [main.css:6-9](src/assets/main.css) (`@theme`). They're hand-kept in sync.

**Action:** keep the canonical hex values in `@theme` (Tailwind v4 idiom) and reference them from `base.css` as `var(--color-brand)`. Or vice versa — but pick one.

### 2.4 Remove dead code
- [src/stores/counter.ts](src/stores/counter.ts) — unused Vue starter boilerplate.
- [src/components/CountdownTimer.vue](src/components/CountdownTimer.vue) — exists, never imported anywhere.
- Pinia is installed and registered in [main.ts:5,11](src/main.ts) but no real store uses it. Decide: drop Pinia entirely, or keep for a future store (e.g. RSVP draft persisted to localStorage). Recommendation: **drop it**, re-add when needed.
- [commit-design-system.sh](commit-design-system.sh) in repo root — looks like a one-time migration script. Verify and delete.

### 2.5 Move CLAUDE.md "Wedding Details" out of CLAUDE.md
The wedding fact table currently lives in CLAUDE.md. Once §2.1 lands, CLAUDE.md should point at `src/config/wedding.ts` as the canonical source — otherwise the two drift and we're back where we started (CLAUDE.md already drifted on the brand colour).

---

## 3. Code quality / readability

### 3.1 Decompose `RsvpView.vue` (1063 lines)
By itself, this file is half the codebase. Suggested split:
- `RsvpView.vue` — orchestration only (~150 lines).
- `RsvpForm.vue` — the form fields + state.
- `RsvpSuccess.vue` — the thank-you state.
- `composables/useRsvpForm.ts` — `guests`, `childrenAges`, `form`, watches, `handleSubmit`. Pure logic, testable in isolation.
- `composables/useDietaryExclusion.ts` — the "nessuna restrizione" mutual-exclusion logic.

Bonus: composables become trivially unit-testable (see §7.2).

### 3.2 Replace icon `<svg>` ladder in `WeddingTimeline.vue`
[WeddingTimeline.vue:24-50](src/components/WeddingTimeline.vue) is a `v-if/v-else-if/v-else` ladder of 6 SVGs. Cleaner:
- Move icons to `src/components/icons/` as individual single-file components or a typed lookup.
- Or use a `<component :is="iconMap[event.icon]" />` pattern.

Either way, the template body shrinks from ~25 lines to 1.

### 3.3 Naming / consistency
- Some files use **single-quote** strings ([RsvpView.vue](src/views/RsvpView.vue)), others **double-quote** (all other views). Prettier already runs — verify the config and re-format.
- Italian field names in state (`form.has_children`) vs English component names. Pick one convention; English-snake matches what Netlify expects.

---

## 4. Accessibility

### 4.1 Mobile drawer (AppNav)
[AppNav.vue:44-72](src/components/AppNav.vue) has issues:
- `aria-label="Apri menu"` stays as "Apri" even when the drawer is open — should toggle to "Chiudi menu".
- Hamburger has no `aria-controls` pointing to the drawer's `id`.
- Drawer doesn't close on **Escape**, doesn't close on **outside click**, doesn't trap focus.
- No skip-to-content link in the layout.

### 4.2 Per-route `<title>` and meta description
[index.html:14](index.html) sets a single static title for all 6 routes. Guests landing on `/rsvp` see "Marta &amp; Giacomo — 29.08.2026" in the tab.

**Action:** add a `meta.title` to each route record and a `router.afterEach` that updates `document.title`. Same for `og:title` and `og:description` if §6.1 is in scope.

### 4.3 `prefers-reduced-motion`
Several CSS transitions and the submit-button spinner have no reduced-motion fallback. Wrap animations in `@media (prefers-reduced-motion: no-preference)`.

### 4.4 Hero image dimensions
[HomeView.vue:12,18,28](src/views/HomeView.vue) hero `<img>` tags have no `width`/`height` attributes → cumulative layout shift on slow connections. Add intrinsic dimensions.

---

## 5. Performance

### 5.1 Font loading
[index.html:12](index.html) loads Raleway + Roboto from Google Fonts with `&display=swap` (good). Improvements:
- Self-host the fonts (saves a DNS + TLS round-trip, and dodges any GDPR concern about Google Fonts in EU).
- Or at least add `<link rel="preload" as="font" crossorigin>` for the two weights actually used above the fold.
- Raleway is requested with **8 weights** (300/400/500/600/700 + italic). The site uses 500/700 mostly. Audit which weights are actually referenced and trim.

### 5.2 Image hygiene
The three calligraphy/illustration PNGs in [src/assets/images/](src/assets/images/) ship as-is. Cheap wins:
- Convert the line-art calligraphy PNGs to SVG (they're vector shapes — massive size reduction).
- For the illustration, ship `.webp` alongside `.png` and use `<picture>`.
- Add `loading="eager"` + `fetchpriority="high"` to the hero illustration, `loading="lazy"` to everything else.

### 5.3 Bundle analysis
No bundle-size visibility today. Recommend `rollup-plugin-visualizer` wired to `build` for ad-hoc inspection, plus a Netlify build-time size budget (`bundlewatch` or similar). The site is tiny — but tiny + Pinia-it-doesn't-need is wasted bytes (see §2.4).

---

## 6. SEO / metadata

### 6.1 Open Graph / Twitter cards
[index.html](index.html) has only a `description` meta tag. For a site guests will paste into iMessage/WhatsApp:
- `og:title`, `og:description`, `og:image` (1200×630 preview using the calligraphy on periwinkle), `og:url`, `og:type=website`.
- `twitter:card=summary_large_image`.

### 6.2 Per-route `<title>` (see §4.2)

### 6.3 Indexing posture
The site is essentially public. Decide:
- **Public-discoverable**: add `robots.txt`, add JSON-LD `Event` schema for richer Google previews.
- **Private but unauthenticated**: add `<meta name="robots" content="noindex,nofollow">` so it doesn't surface in random searches. (Most likely the right call for a guest-list site.)

### 6.4 Favicon variants
Only `public/favicon.ico` exists. Add `apple-touch-icon.png` (180×180) and a 32×32 PNG for sharper desktop rendering.

---

## 7. Testing strategy (QA hat)

The only mutation surface is the RSVP form. That's where ~90% of test value lives.

### 7.1 Critical — Netlify form-schema parity test
A unit test (or just a script in CI) that:
1. Parses [index.html](index.html), extracts all `<input name="…">` names inside the `<form name="rsvp">`.
2. Statically extracts all keys passed to `new URLSearchParams({ … })` in [RsvpView.vue:93-111](src/views/RsvpView.vue) (or expose them as an exported constant).
3. Asserts the two sets are equal.

If they diverge, Netlify silently drops fields and the submission lands with missing data. **This is the single most important test on the site.**

### 7.2 Vitest + Vue Test Utils (component-level)
Once the composables are extracted (§3.1):
- `useRsvpForm.test.ts` — payload shape for every combination of (attending ✓), (with/without children), (each dietary option), (with/without shuttle).
- `useDietaryExclusion.test.ts` — selecting "nessuna restrizione" clears others; selecting any other clears "nessuna".
- `PageHeader.test.ts` — renders eyebrow/title/subtitle, defaults subtitle to wedding date.
- `WeddingTimeline.test.ts` — renders events, falls back to star icon for unknown `event.icon` values.
- `AppNav.test.ts` — drawer open/close, route change closes drawer, Escape closes drawer (once §4.1 lands).

### 7.3 Playwright E2E (the safety net)
One smoke spec, one RSVP spec, run on every PR in CI plus on `main` post-deploy:
- `smoke.spec.ts` — visit every route, expect no console errors, expect hero/title visible.
- `rsvp.spec.ts`:
  - Fills the form (1 guest, no children, no dietary, no shuttle) → mocks Netlify `POST /` to 200 → asserts success screen.
  - Adds a second guest, then removes the first → asserts the second guest's data is still bound to the right input (regression test for §1.5).
  - Toggles `has_children=si` → conditional fields appear; toggles back to `no` → fields hidden.
  - Selects "nessuna restrizione" + then "celiachia" → asserts mutual exclusion.
  - Mocks `POST /` to 500 → asserts error banner with the right copy.
  - Mocks `POST /` to network error → asserts the network-error copy.

### 7.4 What NOT to test
Skip visual regression (Chromatic/Percy) — overkill for one launch. Skip Lighthouse-in-CI — manual Lighthouse before launch is fine. Skip a11y unit tests — a single `axe-core` Playwright check per route covers it.

---

## 8. CI / DX

### 8.1 GitHub Actions
No `.github/workflows/` exists. Netlify builds on push to `main`, but PRs get no checks. Add `.github/workflows/ci.yml`:
- `npm ci`
- `npm run type-check`
- `npm run lint`
- `npm run build`
- (if §7 lands) `npm run test:unit` and `npm run test:e2e`

Block merge to `main` until green.

### 8.2 Pre-commit hook
Add `simple-git-hooks` + `lint-staged` to run `oxlint --fix` + `prettier --write` on staged files. Catches issues before push.

### 8.3 `.eslintcache` is not in `.gitignore`
[.gitignore](.gitignore) lists `.eslintcache` only by `.eslintcache` filename… let me re-check: yes it's there at line 45. OK, fine.

### 8.4 Node version pin
`package.json` says `"node": "^20.19.0 || >=22.12.0"`. Add a `.nvmrc` so contributors and CI use the same version automatically.

---

## 9. Content management

### 9.1 String externalisation
All Italian copy lives inline in `<template>` blocks. For a single-language site this is fine, but for the few values likely to change (RSVP deadline, shuttle return time "ancora da confermare", IBAN), pulling them into the `wedding.ts` config (§2.1) means edits land in one file. Right now an edit like "shuttle leaves at 23:30" touches a deeply-nested `<strong>` tag inside a paragraph in [LocationView.vue:108](src/views/LocationView.vue).

### 9.2 No i18n needed
CLAUDE.md confirms Italian-only. Don't add vue-i18n. Don't pre-architect for a language we won't ship.

---

## 10. Suggested execution order

Roughly Now / Next / Later. Each item is a separate PR for clean review.

**Now (this week — risk-reducing):**
1. §1.1 Replace placeholders + add the `placeholder` lint check
2. §2.1 Create `src/config/wedding.ts` (touches every view but mechanical)
3. §2.4 Delete dead code (counter store, CountdownTimer, possibly Pinia)
4. §1.5 Stable `v-for` keys in RSVP

**Next (before announcing the site URL to guests):**
5. §2.2 Extract `PageHeader.vue`
6. §1.3 + §1.4 RSVP validation + state machine
7. §7.1 Netlify form-schema parity test (single most valuable test)
8. §7.3 Playwright RSVP E2E
9. §1.6 `netlify.toml` security headers

**Later (polish, nice-to-have):**
10. §4 Accessibility pass (drawer, titles, reduced motion, image dimensions)
11. §6 OG tags + favicon variants + indexing posture decision
12. §5 Performance pass (font self-hosting, SVG conversion, bundle analysis)
13. §8 GitHub Actions CI + pre-commit hook
14. §3.1 Decompose `RsvpView.vue` (only worth it once tests are in place to catch regressions)
