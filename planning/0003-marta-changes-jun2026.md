# Planning — Marta's Changes (rev. 3)

Origin: notes from Marta captured in `Matrimonio Martolins Website.md`, reviewed 2 June 2026.

> **Convention:** this file is a **complete snapshot** of the current plan, not a delta. Read it standalone. Previous snapshots live next to it in `planning/`.

---

## 0. Changes since [0002](0002-decisions-and-revised-plan.md)

This revision introduces a new batch of content and UX changes requested by Marta, separate from the technical hardening items in 0002 (which remain valid and in-flight). Items here are scoped to **visible content, layout, and form structure** — no backend involvement.

Items in 0002 that are still open carry forward implicitly; this doc focuses exclusively on the new requests.

**Removed from initial draft (2 June 2026):** Nav wordmark change and page header calligraphic titles — not needed for now. Schedule mobile overflow bug also dropped from scope.

---

## 1. Bug fixes

### 1.1 Hero image appears small on some devices
- **Symptom:** the main hero image renders smaller than expected on certain screen sizes.
- **Action:** inspect `HomeView.vue` hero section; fix `object-fit`, container height, or `min-h` so the image fills the viewport on all breakpoints. Test on mobile and tablet.
- **Status:** to do

---

## 2. Homepage

### 2.1 Remove "Welcome" section
- **Current:** `HomeView.vue` has a welcome/intro section below the hero.
- **Action:** remove it entirely. Keep hero and all sections that follow after Welcome.
- **Status:** to do

---

## 3. Location

### 3.1 Consolidate to a single venue: Ganci Farm
- **Current:** `LocationView.vue` shows multiple venues (e.g. ceremony at one place, reception at another, plus Celle Ligure directions).
- **Requested:** only one location — **Ganci Farm** — for both ceremony and reception.
- **Action:** remove all venue cards/sections that are not Ganci Farm; update address, map embed, and any descriptive text to reference Ganci Farm exclusively.
- **Status:** to do

### 3.2 Remove "Servizio Navetta" section
- **Action:** delete the shuttle/navetta section from `LocationView.vue`.
- **Status:** to do

### 3.3 Remove "Come raggiungere Celle Ligure" section
- **Action:** delete this directions section from `LocationView.vue`.
- **Status:** to do

### 3.4 Add "Il posto è grande" map section
- **New section** to add after the venue info.
- **Title:** "Il posto è grande"
- **Body text (verbatim):** "La cerimonia sta da una parte e il ricevimento dall'altra, ma alla fine è tutto nello stesso posto. Come si vede da questa mappa."
- **Visual:** a hand-drawn illustrated map of Ganci Farm showing ceremony and reception areas.
  - **Blocker:** original illustrated map file not yet delivered by Marta.
  - **Interim:** add the section with a styled placeholder (grey box, label "Mappa in arrivo") at the correct position so layout can be reviewed.
- **Status:** to do (placeholder first)

---

## 4. Schedule (Programma)

### 4.1 Custom icons from Mamma Marta
- **Requested:** replace current icons with custom illustrated symbols provided by Marta's mother.
- **Blocker:** asset files not yet delivered.
- **Action:** when assets arrive, swap current icons in `ScheduleView.vue`. No code change needed now.
- **Status:** blocked (awaiting assets)

### 4.2 Update ceremony and reception locations to Ganci Farm
- **Current:** ceremony and/or reception may reference old/different venue names.
- **Action:** update location strings in `ScheduleView.vue` so both events reference **Ganci Farm**.
- **Status:** to do

### 4.3 Remove lunch description text
- **Text to remove exactly:** `"Pranzo immerso nel verde delle colline liguri."`
- **Status:** to do

### 4.4 Remove evening/party description text
- **Text to remove exactly:** `"Si apre la pista: la giornata continua con musica e tanta voglia di ballare e stare insieme. Anche i bambini si divertiranno — sarà disponibile un servizio di baby-sitting durante tutta la durata dell'evento."`
- **Status:** to do

---

## 5. Registry (Regalo)

### 5.1 No changes for now
- PayPal URL, IBAN, and gift list content pending Marta's final confirmation.
- **Action:** leave `RegistryView.vue` untouched until confirmed.
- **Status:** on hold

---

## 6. RSVP

### 6.1 Remove shuttle/navetta section
- **Action:** delete the navetta-related question/section from `RsvpView.vue`.
- **Status:** to do

### 6.2 Allergy fields — align with guest count, split adults vs. children
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

## 7. Assets pending from Marta

| Asset | Used in | Status |
|---|---|---|
| Illustrated map of Ganci Farm | Location §3.4 | Awaiting file from Marta |
| Custom icons from Mamma Marta | Schedule §4.1 | Awaiting files |

Until each asset arrives, implement a visible styled placeholder so the layout is correct and reviewable. Swap the real file when delivered — no structural changes should be needed.

---

## 8. Execution order (suggested)

Ordered by: bugs first, then content-only before structural.

| # | Item | Section | Blocked? |
|---|---|---|---|
| 1 | Hero image responsive | §1.1 | No |
| 2 | Remove Welcome section (Homepage) | §2.1 | No |
| 3 | Location consolidation + remove navetta + remove Celle Ligure | §3.1–3.3 | No |
| 4 | Add "Il posto è grande" map section (placeholder) | §3.4 | Placeholder only |
| 5 | Schedule: update venues to Ganci Farm | §4.2 | No |
| 6 | Schedule: remove lunch + party text | §4.3–4.4 | No |
| 7 | RSVP: remove navetta section | §6.1 | No |
| 8 | RSVP: per-guest allergy fields | §6.2 | No |
| 9 | Schedule: custom icons | §4.1 | Blocked — awaiting assets |
| 10 | Registry updates | §5.1 | Blocked — awaiting Marta confirmation |

---

## 9. Carry-forward from 0002

The technical hardening items in 0002 remain valid and in-flight. Key ones still open (address in a separate PR):

- Placeholder URL guard in `RegistryView.vue` and `AlbumView.vue` (0002 §1.1)
- RSVP validation layer (0002 §1.3)
- RSVP submit state machine (0002 §1.4)
- Stable `v-for` keys in `RsvpView.vue` (0002 §1.5)
- Netlify security headers (0002 §1.6)
