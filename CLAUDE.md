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

**Components** (`src/components/`): Shared components — `AppNav.vue`. Add new ones here.

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

| Variable | Font | Usage | Style |
|---|---|---|---|
| `--font-display` | Raleway (Google Fonts) | Couple's names, hero titles | bold, uppercase |
| `--font-heading` | Raleway (Google Fonts) | Section headings, nav links, small labels (eyebrows, buttons, IBAN labels, etc.) | bold, uppercase |
| `--font-body` | Roboto (Google Fonts) | Body copy, paragraphs, form fields | regular, **sentence case — never uppercase** |

Body text (paragraphs, intro copy, descriptions, notes) is always set in `--font-body` with no `text-transform: uppercase`. Uppercase is reserved for headings, eyebrows, nav links, buttons, and small labels.

Loaded in `index.html` via Google Fonts. Weights: Great Vibes 400; Cormorant Garamond 300/400/500/600 + italic; Inter 300/400/500.

### Tailwind Utilities (`src/assets/main.css`)

The `@theme` block in `main.css` exposes all tokens as Tailwind utility classes:
`bg-brand`, `bg-brand-dark`, `bg-brand-pale`, `bg-surface`, `bg-surface-alt`,
`text-brand`, `text-ink`, `font-display`, `font-heading`, `font-body`.

### Shared Components

**`AppNav.vue`** — Sticky white navigation bar. Great Vibes "M & G" wordmark, Cormorant Garamond small-caps links, periwinkle active state. Mobile hamburger drawer collapses at `sm` breakpoint.

---

## Page Plan

### Home (`/`) — `HomeView.vue`
The homepage needs to be a full-viewport hero on brand blue background with the following elements all centered:
1. Center image of the calligraphy names (names-calligraphy.png)
2. the illustration of the couple (illustration-martaegiacomo.png) centered 
3. Central text: “Ci sposiamo!”
4. the date using the calligraphy image (date-calligraphy.png)

All the elements are place centered in the specified order. 
All the images can be found in the folder “src/assets/images”


### Location (`/location`) — `LocationView.vue`
Location

The location page is composed by
1. Section with two columns for the locations
- The Ceremony (“Cerimonia civile”) location 
- The Lunch and party (“Ricevimento”).
2. Section with Bus Services (“Servizio navetta”) with the relatively info.
3. Prose section with travel tips from Torino and Genova

The locations need both the google maps link to obtain indication and maps preview.
Use the follow information to complete the information of the page:

Cerimonia civile
Via Mezzalunga, 2, 17015 Celle Ligure
Ore 11:30

Ricevimento
Ganci Farm
Via Ganci, 15, 17015 Celle Ligure
Pranzo ore 13:30
È disponibile il parcheggio della location.

Servizio navetta:
Dal luogo della cerimonia al ricevimento sarà disponibile un servizio navetta per chi non ha un mezzo proprio o nel caso si volesse lasciare la propria auto nel luogo della cerimonia (Celle Ligure).

Andata:
La partenza della navetta è prevista alla fine della cerimonia dal parcheggio davanti ai giardini Mezzalunga di Celle Ligure (google maps).

Ritorno: 
Il ritorno della navetta è previsto dal luogo del ricevimento a Celle Ligure, Ganci Farm alle ore 23:00 (orario ancora da confermare).


### Schedule (`/schedule`) — `ScheduleView.vue`
- Vertical visual timeline of the wedding day
- Rendered via `WeddingTimeline.vue` component (accepts `{ time, title, description }[]` prop)
- Content: **placeholder** — fill in real times before launch

### Registry (`/registry`) — `RegistryView.vue`
- Warm introductory note (#note)
- Gift cards options: PayPal link and IBAN information

#note = "La vostra presenza è il regalo più grande che potessimo desiderare.
In caso voleste contribuire al nostro viaggio di nozze, ecco qualche modo per farlo — con tutto il nostro affetto e gratitudine."


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

## Git & PR Workflow

Claude is allowed to run git and `gh` commands directly to commit, push, and open pull requests on this repo. When the user asks to ship a change or invokes `/create-pr`:

1. Create or switch to a feature branch (never commit straight to `main`).
2. Stage only the files relevant to the change — avoid `git add -A` / `git add .`.
3. Commit with a small, scoped message (one concern per commit).
4. Push the branch to `origin` with `-u` on the first push.
5. Open the PR with `gh pr create`, using a clear title and a body that covers what changed and why. Pass the body via a HEREDOC to preserve formatting.
6. Report the PR URL back to the user.

Never force-push to `main`, never amend already-pushed commits, and never bypass hooks (`--no-verify`) unless the user explicitly asks for it.

## Known Constraints

- No backend, no database — the site must remain purely frontend.
- No dark mode — not applicable for a wedding site.
