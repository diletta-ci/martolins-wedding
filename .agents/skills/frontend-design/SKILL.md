---
name: frontend-design
description: >-
  Create distinctive, production-grade Vue 3 components and views with high
  design quality for the martolins-wedding project. Use when building any
  UI — pages, components, layouts, or interactions. Generates creative,
  polished code that avoids generic AI aesthetics. Always pairs with the
  frontend skill for structural conventions.
---

# Frontend Design — martolins-wedding

This skill encodes the visual identity of Marta & Giacomo's wedding, derived directly from the official invitation. Every component must feel like a natural extension of that invite — not a generic wedding template.

## The Design Language (from the invitation)

The invitation defines everything. Treat it as the design system source of truth.

**Palette — 3 colors only:**
```css
--color-blue:  #8ca7d4;   /* periwinkle — the signature background */
--color-white: #FFFFFF;   /* text, illustration fills, lace */
--color-black: #1A1A1A;   /* line art, groom's suit weight */
```
The blue is dusty and grey-toned, not bright or electric. It feels like faded Italian fresco, not a UI component library. Never introduce new colors without a strong reason. If an accent is needed, derive it from this palette (a tint of the blue, a warm off-white).

**Typography — 3 roles, each distinct:**

| Role | Usage | Font direction |
|---|---|---|
| Script / Hero | Names, romantic headings | Flowing brush-lettered script — expressive, gestural, casual. Not stiff calligraphy. Try: `Lavishly Yours`, `주아` (Jua), `Meow Script`, `Caveat` at large scale |
| Spaced Caps | Labels, navigation, section titles | Wide letter-spacing (`tracking-[0.3em]+`), mixed weight — heavier word + lighter words in the same line (e.g. **SAVE** the date). Try: `Cinzel`, `Cormorant SC`, or any refined serif in uppercase |
| Decorative Date | Dates, numbers | Elegant serif with middle-dot separators (`29·8·2026`). Can reuse the spaced caps font at a different size |

Load all fonts from Google Fonts via `@import` in `src/assets/base.css`.

**Decorative language:**
- **Lace / crochet borders** — the top and bottom lace trim is the signature decorative element. Recreate with SVG, CSS `mask-image`, or a repeating SVG border pattern. It should appear on key full-bleed sections.
- **Illustration style** — the couple portrait is hand-drawn editorial line art (black outlines, white fills, minimal shading). Any additional illustrations or icons should respect this register: no flat vector icons, no emoji-style graphics.
- **Restraint** — the invitation uses generous negative space. The blue breathes. Don't fill space for the sake of it.

## Design Thinking — always do this first

Before writing any code, answer:
1. **Does this component extend the invitation?** Same palette, same type roles, same decorative language.
2. **What is the one thing a visitor will remember?** Aim for that.
3. **Am I introducing anything new?** If yes, justify it against the invitation's tone.

The wedding is in **Celle Ligure** on **29·8·2026**. The tone is warm, personal, Italian coastal — artisanal and human, not polished and corporate.

## Aesthetic Guidelines

### Typography
- Always load the script font + the spaced-caps font — these two define the hierarchy.
- The script font is the hero: use it large, let it breathe, let it overflow if needed.
- Spaced caps: `letter-spacing: 0.25em` minimum. Mix font weights in a single label for rhythm.
- Never use: Inter, Roboto, Arial, system-ui, or any default sans-serif.
- Body copy (if needed): a refined humanist serif like `Cormorant Garamond` or `EB Garamond`, not a geometric sans.

### Color
- Default to: blue background, white text. Or white background, blue + black accents.
- The blue is a background, not an accent — use it at scale, not as a button color.
- Use CSS custom properties defined in `src/assets/base.css`. Extend Tailwind v4 tokens with `@theme` if needed.

### Motion
- Staggered fade-up on page load (the names, then the illustration, then the details).
- Hover states on nav links: subtle, letter-spacing expansion or underline draw, not color fill.
- In Vue: use `<Transition>` with named transitions for route changes.
- One well-orchestrated entrance > many micro-interactions.

### Spatial Composition
- The invitation is portrait, centered, with the illustration as the dominant element.
- On web: large vertical rhythm, centered typographic columns, the script name enormous.
- Navigation: minimal, spaced, all caps — never a hamburger-menu-style component unless necessary.
- Don't default to card grids. Use editorial layouts: full-width type rows, asymmetric image placements, ruled lines as dividers.

### Lace Borders
When creating full-bleed sections or page headers/footers, add the lace trim:
- Use an inline SVG pattern or a `mask-image` with a repeating lace SVG.
- White lace on blue background — as on the invitation top and bottom.
- Keep it subtle: the lace is decorative trim, not the main event.

### Backgrounds
- Periwinkle blue as the primary page background for hero sections.
- White or off-white for content sections — not pure `#fff`, prefer `#FAFAF8` or similar warm whites.
- No gradients unless derived from the blue palette. No noise textures — the invitation is clean and flat.

## Implementation in Vue 3 + Tailwind v4

- Use Tailwind utility classes as the primary styling method.
- Use `<style scoped>` for `@keyframes`, lace SVG masks, and complex selectors Tailwind can't express.
- CSS custom properties for palette and font-family consistency across components.
- Add `@import url(...)` for Google Fonts at the top of `src/assets/base.css`.
- `noUncheckedIndexedAccess` is enabled — guard all array/object lookups.
- Follow structural conventions in the `frontend` skill (block order, routing, stores).

## What to avoid

| Generic AI default | What this wedding does instead |
|---|---|
| Inter / Roboto body font | Brush script + spaced serif caps |
| Purple gradient hero | Flat periwinkle blue + white type, lace border |
| Centered card grid | Editorial single-column with generous scale |
| Soft pastel pink "wedding" palette | Blue + white + black — only 3 colors |
| Flat white background | Periwinkle as the signature background tone |
| Icon library (HeroIcons, Lucide) | No icons — type and space do the work |
| Dividers and horizontal rules | Lace trim, whitespace, or spaced-caps labels |
| Rounded-corner cards | No cards — flat sections with typographic hierarchy |

## Checklist before shipping any UI

- [ ] Does it use only the 3-color palette (blue, white, black)?
- [ ] Are both font roles present — script + spaced caps?
- [ ] Does the script font appear at a scale that feels heroic?
- [ ] Is the lace border present on full-bleed sections?
- [ ] Does it feel like it belongs to the same invite, or like a different wedding?
- [ ] Is there generous negative space — not filled?
- [ ] Does it pass `npm run lint` and `npm run type-check`?
