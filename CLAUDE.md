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

**Routing** (`src/router/index.ts`): Six routes — `/`, `/location`, `/schedule`, `/registry`, `/rsvp`, `/album`. Non-home routes use dynamic imports for code splitting.

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

## Design System

> **The shipped code is the source of truth for content, colours, and layout.**
> This document captures conventions and intent only — for any concrete value
> (hex codes, addresses, dates, form fields), read the code.

### Visual Identity

Derived from the printed invitation: a periwinkle/cornflower blue background, flowing white calligraphic script for the couple's names, small-caps spaced serif for labels, and a delicate lace border motif. The website uses a white/off-white content surface with the periwinkle as the brand accent.

### Color Tokens

Defined in [src/assets/base.css](src/assets/base.css) as `--wedding-*` CSS custom properties (brand / brand-dark / brand-light / brand-pale, surface variants, ink variants, borders). That file is the authoritative source for hex values.

### Typography

| Variable | Font | Usage | Style |
|---|---|---|---|
| `--font-display` | Raleway | Couple's names, hero titles | bold, uppercase |
| `--font-heading` | Raleway | Section headings, nav links, small labels (eyebrows, buttons, IBAN labels, etc.) | bold, uppercase |
| `--font-body` | Roboto | Body copy, paragraphs, form fields | regular, **sentence case — never uppercase** |

Body text (paragraphs, intro copy, descriptions, notes) is always set in `--font-body` with no `text-transform: uppercase`. Uppercase is reserved for headings, eyebrows, nav links, buttons, and small labels.

### Tailwind Utilities

`src/assets/main.css` re-exposes the design tokens in a Tailwind v4 `@theme` block so they're available as utility classes (`bg-brand`, `text-ink`, `font-display`, …).

### Shared Components

**`AppNav.vue`** — sticky white navigation bar with an "M & G" wordmark and a periwinkle active state. Mobile hamburger drawer collapses at the `sm` breakpoint.

### Page Header Pattern

Every view **except the home page** opens with the same hero block: white text on the periwinkle brand background, three centred lines. `LocationView.vue` is the canonical reference — copy its markup and `<style scoped>` block verbatim when building a new view.

**Markup:**

```html
<section class="page-header" aria-label="...">
  <div class="page-header-inner">
    <p class="page-eyebrow">{{ pertinent phrase }}</p>
    <h1 class="page-title">{{ view title }}</h1>
    <p class="page-subtitle">29 · 8 · 2026</p>
  </div>
</section>
```

**Rules:**
- **Eyebrow** — a short pertinent phrase that frames the view (e.g. "Dove ci sposiamo", "La nostra giornata", "I vostri ricordi"). Never the date or a venue label.
- **Title** — the view's name in one or two words ("Location", "Programma", "Regalo", "RSVP", "Foto & Video").
- **Subtitle** — always the wedding date in the canonical format `29 · 8 · 2026`. No venue, no city, no extra suffix.

The CSS for `.page-header`, `.page-header-inner`, `.page-eyebrow`, `.page-title`, `.page-subtitle` is currently duplicated across views. If a third style adjustment is needed, lift it into a shared `PageHeader.vue` component rather than editing each file.

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

## Planning documents

All planning and audit documents live in `planning/`, numbered sequentially
(e.g. `planning/0001-initial-audit.md`, `planning/0002-…`).

**Two rules:**
1. **Never overwrite an existing file** — always create the next-numbered file
   so the history of recommendations is preserved. The latest plan is the
   highest-numbered file in the folder.
2. **Each new file is a complete snapshot, not a delta.** Carry forward all
   relevant context from the previous version and update it with new
   decisions, dropped items, or refined recommendations. A short
   "Changes since 0NNN" section at the top is encouraged, but the rest of the
   file should read standalone — a reader should never need to open the
   previous version to understand the current plan.
