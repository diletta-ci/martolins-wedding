---
name: frontend
description: >-
  Vue 3 conventions and patterns for the martolins-wedding project. Use when
  adding components, views, routes, or Pinia stores, or when asked to style
  with Tailwind CSS v4. Covers file structure, Composition API patterns,
  routing, state management, and TypeScript usage.
allowed-tools: Read, Write, Edit, Bash
---

# Frontend Conventions — martolins-wedding

Vue 3 SPA with TypeScript, Tailwind CSS v4, Vue Router v5, Pinia, and Vite.

## Stack

- Vue 3 + `<script setup lang="ts">` (Composition API)
- Vue Router v5 (`src/router/index.ts`)
- Pinia stores (`src/stores/`)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- TypeScript with `noUncheckedIndexedAccess: true`
- Path alias: `@/` → `src/`

## Component file structure

Always follow this block order — no exceptions:

```vue
<script setup lang="ts">
// imports and logic here
</script>

<template>
  <!-- markup here -->
</template>

<style scoped>
/* optional — only if needed */
</style>
```

- Use `<script setup lang="ts">` — never Options API, never `defineComponent`
- `<style scoped>` is optional; prefer Tailwind utilities in the template
- If you need global styles, add them to `src/assets/main.css` or `src/assets/base.css`

## Views

- One file per route in `src/views/`, named `{Name}View.vue` (e.g. `RsvpView.vue`)
- Views are thin — they compose smaller components; heavy logic goes in stores or composables
- Wrap content in `<main>` for the home view; use a named div (`<div class="rsvp">`) for other views

## Routing (`src/router/index.ts`)

- **Home route**: static import (`import HomeView from "../views/HomeView.vue"`)
- **All other routes**: dynamic import for code splitting

```ts
{
  path: "/rsvp",
  name: "rsvp",
  component: () => import("../views/RsvpView.vue"),
},
```

- Use named routes (always set `name`)
- Navigate with `<RouterLink :to="{ name: 'rsvp' }">` — not raw path strings
- History mode: `createWebHistory(import.meta.env.BASE_URL)`

## Pinia stores (`src/stores/`)

Use the **Composition API** store style — never the Options style:

```ts
import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

- Export stores as `useXxxStore`
- Store ID (first argument to `defineStore`) must match the filename

## Tailwind CSS v4

Tailwind v4 has no `tailwind.config.js` — it is configured via CSS.

- Import in `src/assets/main.css`: `@import "tailwindcss";`
- Use utility classes directly in templates: `class="text-xl font-bold"`
- For custom design tokens, add CSS custom properties in `src/assets/base.css`
- Do **not** use `@apply` unless absolutely necessary

## TypeScript

- `noUncheckedIndexedAccess: true` is enabled — always guard array and object lookups:

```ts
const first = items[0] // type: T | undefined
if (first) { /* safe */ }
```

- Use `@/` for all internal imports: `import MyComp from "@/components/MyComp.vue"`
- Avoid `any` — prefer `unknown` with narrowing

## Dev commands

```bash
npm run dev          # Start dev server
npm run build        # Type-check + production build
npm run lint         # Run oxlint + eslint (both auto-fix)
npm run format       # Prettier formatting
npm run type-check   # vue-tsc only
```

Always run `npm run lint` and `npm run type-check` after making changes.
