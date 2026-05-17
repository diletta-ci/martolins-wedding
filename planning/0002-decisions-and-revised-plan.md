# Planning — Technical Improvements (rev. 2)

Audit scoped to: scalability, readability, and "the site cannot break" QA mindset.
Wedding is **29 August 2026** — these recommendations are prioritised so the highest-risk items land before the site sees real traffic.

> **Convention:** this file is a **complete snapshot** of the current plan, not a delta against [0001](0001-initial-audit.md). Read it standalone. The history of previous snapshots lives next to it in `planning/`.

---

## 0. Changes since [0001](0001-initial-audit.md)

Short summary of what moved between revisions. The full reasoning is integrated into the sections below.

- **Decisions captured (was "Open questions" in 0001):**
  - Code is the source of truth, not CLAUDE.md.
  - Test strategy = Option B (Vitest + Playwright for RSVP).
  - Brand colour `#8DA6D4` in `base.css` is correct; CLAUDE.md `#8599C5` is stale.
  - `PLANNING.md` no longer gitignored (done on `chore/planning-workflow`).
- **Dropped from the plan** (originated as drift between CLAUDE.md spec and code):
  - Adding a "Parteciperò: Sì / No" radio. The form is confirmations-only by design.
  - Adding a "Messaggio per Marta e Giacomo" optional textarea.
- **New section:** §10 CLAUDE.md surgery — slim it down so it can't drift again.
- **Reordered:** RSVP decomposition (§3.1) moves earlier in §11, because it unblocks unit testing.

---

## 1. Critical — must land before guests start using the site

These can break the only interactive surface on the site (the RSVP form) or send guests to dead links.

### 1.1 Placeholder URLs in production code
Two `#…-placeholder` hrefs will ship to prod if forgotten:
- [RegistryView.vue:3](../src/views/RegistryView.vue) — `PAYPAL_URL`, `IBAN`, `BANK_BENEFICIARY`, `BANK_CAUSALE` all dummy values.
- [AlbumView.vue:43](../src/views/AlbumView.vue) — `#wedshoots-placeholder` href.

**Action:**
- Move these into a single `src/config/wedding.ts` (see §2.1).
- Add a runtime guard: in production builds, throw / log to console if any value starts with `#` or contains `placeholder`. Cheap and prevents an embarrassing launch bug.
- Add an `oxlint` / ESLint rule (or just a `grep` check in CI) that fails the build if `placeholder` strings remain.

### 1.2 RSVP — end-to-end Netlify submission test
- Confirm the static form in [index.html:21-37](../index.html) declares **exactly** the same input names that [RsvpView.vue:93-111](../src/views/RsvpView.vue) submits. They currently match — add a test that locks this in (see §7.1).
- Deploy preview → submit → verify the entry appears in Netlify Forms dashboard. Do this on a feature branch before merging.
- Test the spam honeypot: filling `bot-field` should cause Netlify to drop the submission silently.

### 1.3 RSVP — validation feedback
Today, if a required field is empty, the browser shows the native tooltip and that's it. Issues:
- The `has_children` radio group has `required` on each option; native validation works but the message is generic.
- No client-side validation for malformed numeric ages (e.g. negative, > 17, non-integer).
- No "you must answer all required questions" summary above the submit button — guests on mobile won't see where the error is.

**Action:** add a thin validation layer (no library needed) that:
- Computes an `errors` map from `form` + `guests` + `childrenAges`.
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
[RsvpView.vue:189](../src/views/RsvpView.vue) and [RsvpView.vue:272](../src/views/RsvpView.vue) use the array index as `:key`. Removing a middle row makes Vue re-bind `v-model` to the wrong input, which has caused real RSVP-form bugs in other Vue apps.

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

The site has 6 routes, all touching the same dozen wedding facts. Right now those facts are scattered across templates.

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
Replaces ad-hoc URL strings in [LocationView.vue:23,36,53,67,95](../src/views/LocationView.vue).

### 2.2 Extract `PageHeader.vue`
The `.page-header`/`.page-header-inner`/`.page-eyebrow`/`.page-title`/`.page-subtitle` block is copy-pasted across 5 views — same markup, ~50 lines of identical `<style scoped>`. CLAUDE.md already calls this pattern out and signals the lift was the planned next move.

**Action:** create `src/components/PageHeader.vue` with props `{ eyebrow, title, ariaLabel? }` and a default subtitle of `WEDDING.formattedDate`. Replace in all 5 views. Saves ~250 lines of CSS duplication and eliminates style drift.

### 2.3 Single colour-token source of truth
Brand colours live in both [base.css:4-9](../src/assets/base.css) and [main.css:6-9](../src/assets/main.css) (`@theme`). They're hand-kept in sync.

**Action:** keep the canonical hex values in `@theme` (Tailwind v4 idiom) and reference them from `base.css` as `var(--color-brand)`. Or vice versa — but pick one.

### 2.4 Remove dead code
- [src/stores/counter.ts](../src/stores/counter.ts) — unused Vue starter boilerplate.
- [src/components/CountdownTimer.vue](../src/components/CountdownTimer.vue) — exists, never imported anywhere.
- Pinia is installed and registered in [main.ts:5,11](../src/main.ts) but no real store uses it. Decide: drop Pinia entirely, or keep for a future store (e.g. RSVP draft persisted to localStorage). Recommendation: **drop it**, re-add when needed.
- [commit-design-system.sh](../commit-design-system.sh) in repo root — looks like a one-time migration script. Verify and delete.

### 2.5 CLAUDE.md "Wedding Details" → point at `wedding.ts`
Once §2.1 lands, the Wedding Details table in CLAUDE.md should be removed (see §10) so the two can't drift again.

---

## 3. Code quality / readability

### 3.1 Decompose `RsvpView.vue` (1063 lines)
By itself, this file is half the codebase. Suggested split:
- `RsvpView.vue` — orchestration only (~150 lines).
- `RsvpForm.vue` — the form fields + state.
- `RsvpSuccess.vue` — the thank-you state.
- `composables/useRsvpForm.ts` — `guests`, `childrenAges`, `form`, watches, `handleSubmit`. Pure logic, testable in isolation.
- `composables/useDietaryExclusion.ts` — the "nessuna restrizione" mutual-exclusion logic.

This refactor is **a prerequisite for the unit tests in §7.2** — moved earlier in the execution order in §11.

### 3.2 Replace icon `<svg>` ladder in `WeddingTimeline.vue`
[WeddingTimeline.vue:24-50](../src/components/WeddingTimeline.vue) is a `v-if/v-else-if/v-else` ladder of 6 SVGs. Cleaner:
- Move icons to `src/components/icons/` as individual single-file components or a typed lookup.
- Or use a `<component :is="iconMap[event.icon]" />` pattern.

Either way, the template body shrinks from ~25 lines to 1.

### 3.3 Naming / consistency
- Some files use **single-quote** strings ([RsvpView.vue](../src/views/RsvpView.vue)), others **double-quote** (all other views). Prettier already runs — verify the config and re-format.
- Italian field names in state (`form.has_children`) vs English component names. Pick one convention; English-snake matches what Netlify expects.

---

## 4. Accessibility

### 4.1 Mobile drawer (AppNav)
[AppNav.vue:44-72](../src/components/AppNav.vue) has issues:
- `aria-label="Apri menu"` stays as "Apri" even when the drawer is open — should toggle to "Chiudi menu".
- Hamburger has no `aria-controls` pointing to the drawer's `id`.
- Drawer doesn't close on **Escape**, doesn't close on **outside click**, doesn't trap focus.
- No skip-to-content link in the layout.

### 4.2 Per-route `<title>` and meta description
[index.html:14](../index.html) sets a single static title for all 6 routes. Guests landing on `/rsvp` see "Marta &amp; Giacomo — 29.08.2026" in the tab.

**Action:** add a `meta.title` to each route record and a `router.afterEach` that updates `document.title`. Same for `og:title` and `og:description` if §6.1 is in scope.

### 4.3 `prefers-reduced-motion`
Several CSS transitions and the submit-button spinner have no reduced-motion fallback. Wrap animations in `@media (prefers-reduced-motion: no-preference)`.

### 4.4 Hero image dimensions
[HomeView.vue:12,18,28](../src/views/HomeView.vue) hero `<img>` tags have no `width`/`height` attributes → cumulative layout shift on slow connections. Add intrinsic dimensions.

---

## 5. Performance

### 5.1 Font loading
[index.html:12](../index.html) loads Raleway + Roboto from Google Fonts with `&display=swap` (good). Improvements:
- Self-host the fonts (saves a DNS + TLS round-trip, and dodges any GDPR concern about Google Fonts in EU).
- Or at least add `<link rel="preload" as="font" crossorigin>` for the two weights actually used above the fold.
- Raleway is requested with **8 weights** (300/400/500/600/700 + italic). The site uses 500/700 mostly. Audit which weights are actually referenced and trim.

### 5.2 Image hygiene
The three calligraphy/illustration PNGs in [src/assets/images/](../src/assets/images/) ship as-is. Cheap wins:
- Convert the line-art calligraphy PNGs to SVG (they're vector shapes — massive size reduction).
- For the illustration, ship `.webp` alongside `.png` and use `<picture>`.
- Add `loading="eager"` + `fetchpriority="high"` to the hero illustration, `loading="lazy"` to everything else.

### 5.3 Bundle analysis
No bundle-size visibility today. Recommend `rollup-plugin-visualizer` wired to `build` for ad-hoc inspection, plus a Netlify build-time size budget (`bundlewatch` or similar). The site is tiny — but tiny + Pinia-it-doesn't-need is wasted bytes (see §2.4).

---

## 6. SEO / metadata

### 6.1 Open Graph / Twitter cards
[index.html](../index.html) has only a `description` meta tag. For a site guests will paste into iMessage/WhatsApp:
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

## 7. Testing strategy — Option B (locked)

Decision: **Vitest + @vue/test-utils** for unit/component tests focused on RSVP logic + **Playwright** for the RSVP E2E. Skipping the broader sweep (AppNav / WeddingTimeline component tests, Lighthouse CI) for now.

Dependencies to add:
```jsonc
"devDependencies": {
  "vitest": "^…",
  "@vue/test-utils": "^…",
  "@vitest/coverage-v8": "^…",
  "jsdom": "^…",
  "@playwright/test": "^…"
}
```
Scripts to add:
```jsonc
"test:unit": "vitest run",
"test:unit:watch": "vitest",
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

### 7.1 Critical — Netlify form-schema parity test
A unit test (or just a script in CI) that:
1. Parses [index.html](../index.html), extracts all `<input name="…">` names inside the `<form name="rsvp">`.
2. Statically extracts all keys passed to `new URLSearchParams({ … })` in [RsvpView.vue:93-111](../src/views/RsvpView.vue) (or expose them as an exported constant).
3. Asserts the two sets are equal.

If they diverge, Netlify silently drops fields and the submission lands with missing data. **This is the single most important test on the site.**

### 7.2 Vitest + Vue Test Utils (component-level)
Once the composables are extracted (§3.1):
- `useRsvpForm.test.ts` — payload shape for every combination of (with/without children), (each dietary option), (with/without shuttle).
- `useDietaryExclusion.test.ts` — selecting "nessuna restrizione" clears others; selecting any other clears "nessuna".

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

### 7.4 Out of scope for Option B
- Component tests for `AppNav` / `WeddingTimeline` / `PageHeader` — skipped.
- Visual regression (Chromatic/Percy) — skipped.
- Lighthouse-in-CI — skipped (manual Lighthouse before launch is fine).
- a11y unit tests — skipped (an `axe-core` Playwright check per route is enough if desired later).

---

## 8. CI / DX

### 8.1 GitHub Actions
No `.github/workflows/` exists. Netlify builds on push to `main`, but PRs get no checks. Add `.github/workflows/ci.yml`:
- `npm ci`
- `npm run type-check`
- `npm run lint`
- `npm run build`
- `npm run test:unit`
- `npm run test:e2e`

Block merge to `main` until green.

### 8.2 Pre-commit hook
Add `simple-git-hooks` + `lint-staged` to run `oxlint --fix` + `prettier --write` on staged files. Catches issues before push.

### 8.3 Node version pin
`package.json` says `"node": "^20.19.0 || >=22.12.0"`. Add a `.nvmrc` so contributors and CI use the same version automatically.

---

## 9. Content management

### 9.1 String externalisation
All Italian copy lives inline in `<template>` blocks. For a single-language site this is fine, but for the few values likely to change (RSVP deadline, shuttle return time "ancora da confermare", IBAN), pulling them into the `wedding.ts` config (§2.1) means edits land in one file. Right now an edit like "shuttle leaves at 23:30" touches a deeply-nested `<strong>` tag inside a paragraph in [LocationView.vue:108](../src/views/LocationView.vue).

### 9.2 No i18n needed
CLAUDE.md confirms Italian-only. Don't add vue-i18n. Don't pre-architect for a language we won't ship.

---

## 10. CLAUDE.md surgery — slim, don't sync (NEW)

Decision (this iteration): **the shipped code is the source of truth**. CLAUDE.md was the seed document used to bootstrap the first version of the site, and it has already drifted (brand colour `#8599C5` vs actual `#8DA6D4`; form fields documented that were never built). Updating CLAUDE.md to mirror the code will only kick the drift can down the road — the only stable fix is to stop duplicating.

### 10.1 Delete outright
- The entire **"Page Plan"** section (lines 129–230 of CLAUDE.md). Code is the spec. Single highest-impact change.
- The **"Wedding Details"** table (lines 45–55). Will be replaced by `src/config/wedding.ts` (§2.1) — until then, the data is already in the rendered code.
- The **hardcoded hex values** in the "Color Tokens" code block (lines 67–80). Replace with: *"See `src/assets/base.css` for the authoritative token values."*

### 10.2 Keep but trim
- **Visual Identity** paragraph — keep. It explains the *intent* (periwinkle from the invitation), which the CSS can't tell you.
- **Typography** table — keep the *rules* (body copy never uppercase) but drop the redundant "Loaded in `index.html` via Google Fonts" line that lists stale fonts (mentions Great Vibes / Cormorant / Inter, none of which are actually used).
- **Tailwind Utilities** — keep but shorten to one sentence: *"`main.css` re-exposes the tokens as Tailwind utility classes."*
- **Shared Components** — keep, but the description mentions fonts that aren't actually used. Trim.
- **Page Header Pattern** — keep as a **convention**. It's the only doc of how new views should look.

### 10.3 Add
- A pointer at the top of the design-system section: *"The shipped code is the source of truth for content, colours, and layout. This document captures conventions and intent only."*

### 10.4 Net effect
CLAUDE.md drops from ~255 lines to ~120. No content lost — only duplication.

---

## 11. Execution order

Roughly Now / Next / Later. Each item is a separate PR for clean review.

**Now (this iteration — clear the deck for testing):**
1. **§10 — CLAUDE.md surgery.** Cheap, eliminates drift risk. No code changes.
2. **§2.1 — `src/config/wedding.ts`** (single source of truth for wedding facts).
3. **§2.4 — Delete dead code** (`stores/counter.ts`, `CountdownTimer.vue`, Pinia if no use remains).
4. **§1.1 — Replace placeholder URLs** (PayPal, IBAN, WedShoots) via the new `wedding.ts`. Add the `placeholder` lint guard.
5. **§1.5 — Stable `v-for` keys** in RSVP guest/child lists.

**Next (unlock testing):**
6. **§3.1 — Decompose `RsvpView.vue`** into a composable + smaller components. Required for §7.2 unit tests.
7. **§7 scaffolding — Vitest config** + jsdom env + first parity test (§7.1).
8. **§1.4 — RSVP submit state machine** (discriminated union).
9. **§1.3 — RSVP validation feedback**.
10. **§7 scaffolding — Playwright** + `rsvp.spec.ts`.

**Later (polish + CI):**
11. **§2.2 — Extract `PageHeader.vue`**.
12. **§1.6 — `netlify.toml` security headers**.
13. **§4 — Accessibility pass** (drawer Esc/aria, per-route titles, reduced motion, hero image dimensions).
14. **§6 — OG tags + favicon variants + `noindex` decision**.
15. **§5 — Performance pass** (font self-hosting, SVG conversion, bundle analysis).
16. **§8 — GitHub Actions CI** wiring `type-check + lint + test:unit + test:e2e + build`. Pre-commit hook optional.

**Deferred / not doing (per decisions in §0):**
- Adding "Parteciperò Sì/No" radio.
- Adding "Messaggio per Marta e Giacomo" textarea.
- Component tests for `AppNav` / `WeddingTimeline`.
- Lighthouse CI.

---

## 12. Open questions for this iteration

Two minor judgment calls for when we start executing:

1. **Should Vitest live next to source files (`src/**/*.test.ts`) or in a top-level `tests/` folder?** I'll default to a top-level `tests/` folder unless you prefer co-location — it keeps the source tree clean and makes the `tsconfig.app.json` `exclude` pattern simpler.
2. **Should I push `chore/planning-workflow` and open a PR for the planning-folder commit, or wait until the CLAUDE.md surgery (§10) is on the same branch?** My recommendation: piggyback the CLAUDE.md surgery onto the same branch — it's the same "doc hygiene" theme, and one PR is easier to review than two.
