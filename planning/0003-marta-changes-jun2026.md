# Planning — Marta's Changes (rev. 3)

Origin: notes from Marta captured in `Matrimonio Martolins Website.md`, reviewed 2 June 2026.

> **Convention:** this file is a **complete snapshot** of the current plan, not a delta. Read it standalone. Previous snapshots live next to it in `planning/`.

---

## 0. Changes since [0002](0002-decisions-and-revised-plan.md)

This revision introduces a new batch of content and UX changes requested by Marta, separate from the technical hardening items in 0002 (which remain valid and in-flight). Items here are scoped to **visible content, layout, and form structure** — no backend involvement.

Items in 0002 that are still open carry forward implicitly; this doc focuses exclusively on the new requests.

---

## 1. Bug fixes

### 1.1 Hero image appears small on some devices
- **Symptom:** the main hero image renders smaller than expected on certain screen sizes.
- **Action:** inspect `HomeView.vue` hero section; fix `object-fit`, container height, or `min-h` so the image fills the viewport on all breakpoints. Test on mobile and tablet.
- **Status:** to do

### 1.2 Schedule page text overflows on mobile
- **Symptom:** large text in `ScheduleView.vue` breaks layout and exits the viewport on mobile.
- **Action:** audit font sizes and container widths in the schedule view; apply responsive `text-sm`/`text-base` variants or `break-words` where needed.
- **Status:** to do

---

## 2. Global / Nav

### 2.1 "M & G" wordmark → calligraphic treatment
- **Current:** `AppNav.vue` shows plain "M & G" text.
- **Requested:** replace with a calligraphic symbol or script lettering.
- **Options (decide with Marta):**
  - A: use a web-safe calligraphic font (e.g. Great Vibes) for the wordmark only — quick, no asset needed.
  - B: embed the SVG/PNG from the invitation once the asset arrives.
- **Blocker:** original invitation asset not yet delivered. Implement Option A as placeholder; swap to B when available.
- **Status:** to do (placeholder font first)

---

## 3. Global / Headers (all views except Home)

### 3.1 Page header — calligraphic titles only
- **Requested:** the `<h1>` in each page header should feel calligraphic/script — "titoli calligrafici e basta."
- **Current:** titles use `--font-heading` (Raleway, bold uppercase).
- **Action:** introduce a calligraphic web font (e.g. Great Vibes or Cormorant Upright Italic) scoped to the `page-title` class. Adjust case (no `uppercase` transform on a script font). This is the third style touch to the page header → lift into a shared `PageHeader.vue` component per the CLAUDE.md convention.
- **Status:** to do

---

## 4. Homepage

### 4.1 Remove "Welcome" section
- **Current:** `HomeView.vue` has a welcome/intro section below the hero.
- **Action:** remove it entirely. Keep hero and all sections that follow after Welcome.
- **Status:** to do

---

## 5. Location

### 5.1 Consolidate to a single venue: Ganci Farm
- **Current:** `LocationView.vue` shows multiple venues (e.g. ceremony at one place, reception at another, plus Celle Ligure directions).
- **Requested:** only one location — **Ganci Farm** — for both ceremony and reception.
- **Action:** remove all venue cards/sections that are not Ganci Farm; update address, map embed, and any descriptive text to reference Ganci Farm exclusively.
- **Status:** to do

### 5.2 Remove "Servizio Navetta" section
- **Action:** delete the shuttle/navetta section from `LocationView.vue`.
- **Status:** to do

### 5.3 Remove "Come raggiungere Celle Ligure" section
- **Action:** delete this directions section from `LocationView.vue`.
- **Status:** to do

### 5.4 Add "Il posto è grande" map section
- **New section** to add after the venue info.
- **Title:** "Il posto è grande"
- **Body text (verbatim):** "La cerimonia sta da una parte e il ricevimento dall'altra, ma alla fine è tutto nello stesso posto. Come si vede da questa mappa."
- **Visual:** a hand-drawn illustrated map of Ganci Farm showing ceremony and reception areas.
  - **Blocker:** original illustrated map file not yet delivered by Marta.
  - **Interim:** add the section with a styled placeholder (grey box, label "Mappa in arrivo") at the correct position so layout can be reviewed.
- **Status:** to do (placeholder first)

---

## 6. Schedule (Programma)

### 6.1 Custom icons from Mamma Marta
- **Requested:** replace current icons with custom illustrated symbols provided by Marta's mother.
- **Blocker:** asset files not yet delivered.
- **Action:** when assets arrive, swap current icons in `ScheduleView.vue`. No code change needed now.
- **Status:** blocked (awaiting assets)

### 6.2 Update ceremony and reception locations to Ganci Farm
- **Current:** ceremony and/or reception may reference old/different venue names.
- **Action:** update location strings in `ScheduleView.vue` so both events reference **Ganci Farm**.
- **Status:** to do

### 6.3 Remove lunch description text
- **Text to remove exactly:** `"Pranzo immerso nel verde delle colline liguri."`
- **Status:** to do

### 6.4 Remove evening/party description text
- **Text to remove exactly:** `"Si apre la pista: la giornata continua con musica e tanta voglia di ballare e stare insieme. Anche i bambini si divertiranno — sarà disponibile un servizio di baby-sitting durante tutta la durata dell'evento."`
- **Status:** to do

---

## 7. Registry (Regalo)

### 7.1 No changes for now
- PayPal URL, IBAN, and gift list content pending Marta's final confirmation.
- **Action:** leave `RegistryView.vue` untouched until confirmed.
- **Status:** on hold

---

## 8. RSVP

### 8.1 Remove shuttle/navetta section
- **Action:** delete the navetta-related question/section from `RsvpView.vue`.
- **Status:** to do

### 8.2 Allergy fields — align with guest count, split adults vs. children
- **Current:** a single allergy field independent of guest count.
- **Requested:** allergy fields must match the number of participants, with a clear split between adults and children (important for catering).
- **Behaviour:**
  - When user specifies N adults: show N adult allergy inputs (one per adult, inside the existing guest loop).
  - When user specifies M children: show M child allergy inputs (one per child, inside the existing children loop).
- **Action:**
  - Add an `allergies` string field to the per-adult guest object in `RsvpView.vue`.
  - Add an `allergies` string field to the per-child object in `RsvpView.vue`.
  - Label clearly: e.g. "Allergie / intolleranze — Adulto 1", "Allergie / intolleranze — Bambino 1".
  - Update submission payload with clear naming (e.g. `adult_1_allergies`, `child_1_allergies`).
  - Update the hidden Netlify detection form in `index.html` to declare the new field names.
- **Status:** to do

---

## 9. Assets pending from Marta

| Asset | Used in | Status |
|---|---|---|
| Illustrated map of Ganci Farm | Location §5.4 | Awaiting file from Marta |
| Custom icons from Mamma Marta | Schedule §6.1 | Awaiting files |
| Calligraphic wordmark/symbol | Nav §2.1 | Awaiting invitation asset |

Until each asset arrives, implement a visible styled placeholder so the layout is correct and reviewable. Swap the real file when delivered — no structural changes should be needed.

---

## 10. Execution order (suggested)

Ordered by: unblock others first, bugs before features, content before structure.

| # | Item | Section | Blocked? |
|---|---|---|---|
| 1 | Schedule mobile overflow | §1.2 | No |
| 2 | Hero image responsive | §1.1 | No |
| 3 | Remove Welcome section (Homepage) | §4.1 | No |
| 4 | Location consolidation + remove navetta + remove Celle Ligure | §5.1–5.3 | No |
| 5 | Add "Il posto è grande" map section (placeholder) | §5.4 | Placeholder only |
| 6 | Schedule: update venues to Ganci Farm | §6.2 | No |
| 7 | Schedule: remove lunch + party text | §6.3–6.4 | No |
| 8 | RSVP: remove navetta section | §8.1 | No |
| 9 | RSVP: per-guest allergy fields | §8.2 | No |
| 10 | Nav: calligraphic wordmark (web font placeholder) | §2.1 | Placeholder only |
| 11 | Page headers: calligraphic titles + PageHeader component | §3.1 | No |
| 12 | Schedule: custom icons | §6.1 | Blocked — awaiting assets |
| 13 | Registry updates | §7.1 | Blocked — awaiting Marta confirmation |

---

## 11. Carry-forward from 0002

The technical hardening items in 0002 remain valid and in-flight. Key ones still open (address in a separate PR):

- Placeholder URL guard in `RegistryView.vue` and `AlbumView.vue` (0002 §1.1)
- RSVP validation layer (0002 §1.3)
- RSVP submit state machine (0002 §1.4)
- Stable `v-for` keys in `RsvpView.vue` (0002 §1.5)
- Netlify security headers (0002 §1.6)
