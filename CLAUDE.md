# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Wedding website for Marta's wedding. Live at https://martolinswedding.netlify.app (deployed via Netlify).

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

**Views** (`src/views/`): One `.vue` file per route. App-wide navigation lives in `App.vue`.

**State** (`src/stores/`): Pinia stores with Composition API. Currently minimal.

**Styles**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Global styles in `src/assets/`.

**Path alias**: `@/` resolves to `src/`.

## Stack

- Vue 3 + Vue Router v5 + Pinia
- Vite 7 with `@vitejs/plugin-vue-jsx` and `vite-plugin-vue-devtools`
- TypeScript with `noUncheckedIndexedAccess` enabled
- ESLint (flat config) + Oxlint + Prettier
