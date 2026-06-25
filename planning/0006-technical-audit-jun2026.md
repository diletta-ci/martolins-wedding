# Technical Audit — Giugno 2026

Analisi approfondita del codebase per miglioramenti tecnici, pulizia e scalabilità.

## Aggiornamenti rispetto a 0005

- #4 completato: Tailwind rimosso (PR #61)

---

## Priorità Alta

### 1. Deduplicare `.page-header` e `.page-title-img`

**Problema.** 18 righe di CSS identiche ripetute in 5 view (`LocationView`, `ScheduleView`, `RegistryView`, `RsvpView`, `AlbumView`): stessa background-color, stesso radial-gradient, stesso padding, stessa clamp. Ogni modifica richiede 5 interventi sincronizzati.

**Soluzione.** Estrarre un componente `PageHeader.vue` che accetta prop `src` e `alt`, oppure spostare `.page-header` + `.page-title-img` in `base.css` come stile globale non scoped.

---

### 2. Focus visibile su custom radio/checkbox in RSVP

**Problema.** In `RsvpView.vue`, `<input type="radio">` e `<input type="checkbox">` sono nascosti con `display: none` — nessun CSS gestisce `:focus-visible` sui custom mark. Utenti da tastiera non vedono il focus.

**Soluzione.**
```css
.radio-option input:focus-visible + .radio-mark,
.checkbox-option input:focus-visible + .checkbox-mark {
  outline: 2px solid var(--wedding-brand);
  outline-offset: 2px;
}
```
Usare `opacity: 0; position: absolute` invece di `display: none`.

---

## Priorità Media

### 3. Token duplicati: `base.css` vs `main.css`

**Problema.** Token di design definiti in `base.css` (`--wedding-brand`, `--font-heading`, ecc.) ridefiniti con nomi diversi nel blocco `@theme` di `main.css`. Due sistemi paralleli per gli stessi valori.

**Soluzione.** Usare i token `--wedding-*` come fonte di verità, referenziarli in `@theme` via `var()` invece di duplicare i valori hex.

> **Nota:** il blocco `@theme` è stato rimosso con il Tailwind (PR #61). Verificare che non siano rimaste ridefinizioni in `main.css`.

---

### 5. Mix `public/` vs `src/assets/` per le immagini

**Problema.** Le immagini in `src/assets/images/` sono importate via `import` (hash, ottimizzazione Vite), mentre i title PNG (`/tit-location.png`, ecc.) vivono in `public/` referenziati come URL assoluti (nessun hash, nessun cache-busting automatico).

**Soluzione.** Spostare i title PNG in `src/assets/images/` e importarli come le altre immagini, oppure documentare la scelta come intenzionale.

---

### 6. `aria-label` hamburger statico

**Problema.** `AppNav.vue` riga 47: `aria-label="Apri menu"` è statico anche quando il menu è aperto. `aria-expanded` è corretto, ma il label non cambia in "Chiudi menu".

**Soluzione.** `:aria-label="menuOpen ? 'Chiudi menu' : 'Apri menu'"`.

---

### 7. `BaseButton.vue` — pulsante CTA duplicato

**Problema.** Il pattern del bottone brand (blu, border-radius, letter-spacing, uppercase, transition) è reimplementato da zero in ogni view: `.location-btn`, `.gift-btn--solid`, `.cta-btn`, `.not-found-btn`. Divergeranno nel tempo.

**Soluzione.** Creare `BaseButton.vue` con prop `variant` (`solid`/`outline`) e `tag` (`button`/`a`/`RouterLink`).

---

### 15. `:key="index"` in `<TransitionGroup>` — chiave instabile

**Problema.** Sia la guest list (riga 195) che la child list (riga 319) usano `:key="index"`. Quando si rimuove un ospite non-ultimo, Vue ricicla i nodi DOM per posizione: i dietary checkbox del guest successivo possono comparire brevemente nello stato sbagliato durante l'animazione.

**Soluzione.**
```ts
// in addGuest / addChild, aggiungere un id stabile
let nextId = 0
function newGuest(): Guest { return { id: nextId++, nome: '', cognome: '', dietary: newDietary() } }
```
Poi `:key="guest.id"` e `:key="child.id"`.

---

## Priorità Bassa

### 8. `--nav-h` scoped su `:root`

**Problema.** `HomeView.vue` riga 44: `--nav-h: 3.75rem` dichiarata in `<style scoped>` su `:root`. Gli stili scoped di Vue non funzionano su `:root` — la variabile diventa globale non intenzionale. `NotFoundView.vue` usa il valore hardcoded nel `calc`.

**Soluzione.** Spostare `--nav-h: 3.75rem` in `base.css` tra i token globali.

---

### 9. Dead code: `icon` prop e `stores/counter.ts`

**Problema.**
- `WeddingTimeline.vue`: la prop `icon` con i valori SVG (`"rings" | "camera" | "fork"` ecc.) non è usata da nessuna view — tutte passano `iconImage`.
- `src/stores/counter.ts`: store boilerplate Pinia non usato da nessun componente.

**Soluzione.** Rimuovere entrambi.

---

### 10. `HomeView` non lazy-loaded nel router

**Problema.** `router/index.ts`: `HomeView` è importata staticamente, tutte le altre view usano dynamic import. Il bundle iniziale include il template della home anche quando l'utente atterra su `/rsvp`.

**Soluzione.** Uniformare a `component: () => import('../views/HomeView.vue')` oppure lasciare statica con un commento che giustifica la scelta (above-the-fold).

---

### 11. `vite-plugin-vue-devtools` non condizionato

**Problema.** `vite.config.ts`: `vueDevTools()` gira incondizionatamente, anche in build di produzione.

**Soluzione.**
```ts
...(process.env.NODE_ENV !== 'production' ? [vueDevTools()] : [])
```

---

### 12. Font loading: FOUT su connessioni lente

**Problema.** Google Fonts caricato con `display=swap` — su connessioni lente l'utente vede un flash of unstyled text pronunciato per tutti i titoli Raleway uppercase. Nessun `<link rel="preload">` per i font critici.

**Soluzione.** Passare a `display=optional` (nessun FOUT) oppure aggiungere `<link rel="preload" as="font">` per Raleway 400 e 700.

---

### 13. Colori hardcoded in RsvpView

**Problema.** `RsvpView.vue`: `#c0392b`, `#fef0ee`, `#f5c6c2` hardcoded per gli stati di errore invece dei token.

**Soluzione.** Aggiungere `--wedding-error`, `--wedding-error-bg`, `--wedding-error-border` in `base.css`.

---

## Form RSVP — Bug e testabilità

Il form RSVP è l'unica parte del sito con logica significativa. Due bug reali, un problema di testabilità strutturale, e una lacuna di validazione — in parte già risolti.

---

### 14. Validazione client-side mancante

**Problema.** Il form usa `novalidate`, che disabilita la validazione nativa del browser, ma non sostituisce il guard lato JS. Si può inviare il form in tre stati invalidi: (a) nome/cognome del primo ospite vuoti, (b) la radio "Ci sono dei bambini?" non risposta (`has_children === ''`), (c) con `has_children === 'si'`, nome o età di un bambino vuoti. Inoltre `filledGuests` include sempre l'indice 0 a prescindere dal contenuto — un ospite fantasma potrebbe arrivare nel payload Netlify.

**Soluzione.** Aggiungere una funzione `validateForm()` chiamata all'inizio di `handleSubmit` che imposti messaggi di errore per campo e faccia early-return se non valido. I campi richiesti da validare: `guests[0].nome`, `guests[0].cognome`, `has_children`, e (se `has_children === 'si'`) `child.name` + `child.age` per ogni bambino.

---

### 15. `:key="index"` in `<TransitionGroup>` — chiave instabile

(vedi sopra, in Priorità Media)

---

### 16. Logica pura non testabile senza montare il componente

**Problema.** `serializeDietary`, `toggleDietaryNone`, `clearDietaryNone` sono funzioni pure con logica non banale (mutual exclusivity dei checkbox), ma erano definite inline nell'SFC.

**Soluzione.** Estrarre in `src/utils/rsvp.ts`.

---

### 17. Nessun test sul form RSVP

**Problema.** Il form è l'unica parte del sito con logica reale ed era completamente scoperto.

**Soluzione.** Installare Vitest + `@vue/test-utils` e aggiungere test unitari e di componente.

---

## Riepilogo priorità

| # | Priorità | Item | Stato |
|---|----------|------|-------|
| 1 | 🔴 Alta | Deduplicare `.page-header` → `PageHeader.vue` | ✅ PR #50 |
| 2 | 🔴 Alta | Focus visibile radio/checkbox RSVP | ✅ PR #50 |
| 14 | 🔴 Alta | Validazione client-side mancante nel form RSVP | ✅ PR #50 |
| 16 | 🟡 Media | Estrarre logica RSVP in `src/utils/rsvp.ts` per testabilità | ✅ PR #52 |
| 17 | 🟡 Media | Aggiungere test (Vitest) per il form RSVP | ✅ PR #54 |
| 4 | 🟡 Media | Rimuovere Tailwind | ✅ PR #61 |
| 3 | 🟡 Media | Token duplicati `base.css` / `main.css` | ⬜ aperto |
| 5 | 🟡 Media | Mix `public/` vs `src/assets/` immagini | ⬜ aperto |
| 6 | 🟡 Media | `aria-label` hamburger dinamico | ⬜ aperto |
| 7 | 🟡 Media | `BaseButton.vue` componente riutilizzabile | ⬜ aperto |
| 15 | 🟡 Media | `:key="index"` → chiave stabile in `TransitionGroup` RSVP | ⬜ aperto |
| 8 | 🟢 Bassa | `--nav-h` in `base.css` | ⬜ aperto |
| 9 | 🟢 Bassa | Rimuovere dead code (`icon` prop, `stores/counter.ts`) | ⬜ aperto |
| 10 | 🟢 Bassa | `HomeView` lazy-loaded | ⬜ aperto |
| 11 | 🟢 Bassa | `vueDevTools()` condizionato a dev | ⬜ aperto |
| 12 | 🟢 Bassa | Font `display=optional` | ⬜ aperto |
| 13 | 🟢 Bassa | Colori errore come token CSS | ⬜ aperto |
