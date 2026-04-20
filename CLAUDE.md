# CLAUDE.md

This file provides guidance to Claude when working with code in this repository.

## Project

Wedding website for **Marta & Giacomo**. Live at https://martolinswedding.netlify.app (deployed via Netlify, auto-deploy on push to `main`).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm run type-check   # Run vue-tsc
npm run lint         # Run oxlint + eslint (both auto-fix)
npm run format       # Prettier formatting
```

## Architecture

Vue 3 SPA with TypeScript, Tailwind CSS v4, and Vite.

**Routing** (`src/router/index.ts`): Five routes — `/`, `/location`, `/schedule`, `/registry`, `/rsvp`. Non-home routes use dynamic imports for code splitting.

**Views** (`src/views/`): One `.vue` file per route.

**Components** (`src/components/`): Shared components — `AppNav.vue`, `LaceDivider.vue`. Add new ones here.

**State** (`src/stores/`): Pinia stores with Composition API. Currently minimal.

**Styles**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Global styles in `src/assets/`.

**Path alias**: `@/` resolves to `src/`.

## Stack

- Vue 3 + Vue Router v5 + Pinia
- Vite 7 with `@vitejs/plugin-vue-jsx` and `vite-plugin-vue-devtools`
- TypeScript with `noUncheckedIndexedAccess` enabled
- ESLint (flat config) + Oxlint + Prettier

---

## Wedding Details

| Field | Value |
|---|---|
| Couple | Marta & Giacomo |
| Date | 29 August 2026 |
| Venue | Ganci Farm |
| Address | Via Ganci, 15 — 17015 Celle Ligure SV |
| Google Maps | https://maps.app.goo.gl/mQHFNGmcrX75JFb88 |
| Language | Italian only |
| Deployment | Netlify (auto-deploy from `main`) |

---

## Design System

### Visual Identity

Derived from the printed invitation: a periwinkle/cornflower blue background, flowing white calligraphic script for the couple's names, small-caps spaced serif for labels, and a delicate lace border motif. The website uses a white/off-white content surface with the periwinkle as the brand accent.

### Color Tokens (`src/assets/base.css`)

```css
--wedding-brand:       #8599C5   /* periwinkle blue — primary brand */
--wedding-brand-dark:  #6B7FAF   /* hover / active states */
--wedding-brand-light: #C4D0E8   /* tints */
--wedding-brand-pale:  #EEF1F8   /* backgrounds, drawer hover */
--wedding-surface:     #FAFAF8   /* page background */
--wedding-surface-alt: #F3F1ED   /* alternate section background */
--wedding-white:       #FFFFFF
--wedding-ink:         #1C1B18   /* body text */
--wedding-ink-muted:   rgba(28,27,24,0.55)
--wedding-ink-faint:   rgba(28,27,24,0.2)
--wedding-border:      rgba(133,153,197,0.3)
--wedding-border-soft: rgba(133,153,197,0.15)
```

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Great Vibes (Google Fonts) | Couple's names, hero titles — calligraphic script |
| `--font-heading` | Cormorant Garamond (Google Fonts) | Section headings, nav links — elegant serif |
| `--font-body` | Inter | Body copy, form labels, captions |

Loaded in `index.html` via Google Fonts. Weights: Great Vibes 400; Cormorant Garamond 300/400/500/600 + italic; Inter 300/400/500.

### Tailwind Utilities (`src/assets/main.css`)

The `@theme` block in `main.css` exposes all tokens as Tailwind utility classes:
`bg-brand`, `bg-brand-dark`, `bg-brand-pale`, `bg-surface`, `bg-surface-alt`,
`text-brand`, `text-ink`, `font-display`, `font-heading`, `font-body`.

### Shared Components

**`AppNav.vue`** — Sticky white navigation bar. Great Vibes "M & G" wordmark, Cormorant Garamond small-caps links, periwinkle active state. Mobile hamburger drawer collapses at `sm` breakpoint.

**`LaceDivider.vue`** — SVG scallop divider echoing the invitation's lace border. Props: `flip` (boolean, scallops pointing down) and `color` (CSS color, default `--wedding-brand-pale`). Use between page sections.

---

## Page Plan

### Home (`/`) — `HomeView.vue`
- Full-viewport hero: the invitation illustration centered on brand blue background
- "Marta e Giacomo" in Great Vibes, "29 · 8 · 2026 — Celle Ligure" in Cormorant small-caps
- Countdown timer component (`CountdownTimer.vue`) — days/hours/minutes to 29 Aug 2026
- Short welcoming paragraph in Italian below the fold

### Location (`/location`) — `LocationView.vue`
- Venue: **Ganci Farm**, Via Ganci 15, Celle Ligure SV
- Full-width embedded Google Maps iframe (link above)
- "Ottieni indicazioni" button → opens Google Maps
- Prose section with travel tips (placeholder)

### Schedule (`/schedule`) — `ScheduleView.vue`
- Vertical visual timeline of the wedding day
- Rendered via `WeddingTimeline.vue` component (accepts `{ time, title, description }[]` prop)
- Content: **placeholder** — fill in real times before launch

### Registry (`/registry`) — `RegistryView.vue`
- Warm introductory note in Italian
- Gift cards: PayPal link + external wishlist links
- Content: **placeholder** — fill in PayPal URL and wishlist links before launch

### RSVP (`/rsvp`) — `RsvpView.vue`
- **Submitted via Netlify Forms** (no backend needed)
- Form fields:
  - Nome e cognome (required)
  - Parteciperò: Sì / No (radio, required)
  - Numero di adulti: 1 o 2 (conditional on Sì — accounts for +1)
  - Bambini sotto gli 11 anni: 0 / 1 / 2 / 3+ (conditional on Sì)
  - Intolleranze alimentari o allergie (textarea, conditional on Sì)
  - Messaggio per Marta e Giacomo (textarea, optional)
- On success: inline confirmation message, no page redirect
- Netlify Forms setup: static hidden form in `index.html` + `fetch()` POST in the Vue component

---

## Git Workflow

- Work on feature branches, merge to `main` via PR
- Keep commits small and scoped (one concern per commit)
- Active branch: `feature/design-system` — design tokens, AppNav, LaceDivider

## Known Issues / Constraints

- Git commits from the Cowork sandbox leave stale `.git/HEAD.lock` / `.git/index.lock` files on the mounted filesystem. To commit from the sandbox, clone the repo to `/tmp`, commit there, then copy files back. Alternatively commit directly from your own terminal.
- No backend, no database — the site must remain purely frontend.
- No dark mode — not applicable for a wedding site.
