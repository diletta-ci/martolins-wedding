# Technical Audit — Giugno 2026 (aggiornamento)

## Aggiornamenti rispetto a 0007

- #5 chiuso: 8 immagini migrate da `public/` a `src/assets/images/` per hash Vite (PR #65)

---

## Ancora aperti

### 8. `--nav-h` scoped su `:root` — Priorità Bassa

**Problema.** `HomeView.vue` riga 44: `--nav-h: 3.75rem` dichiarata in `<style scoped>` su `:root`. Gli stili scoped di Vue non funzionano su `:root` — la variabile diventa globale non intenzionale.

**Soluzione.** Spostare `--nav-h: 3.75rem` in `base.css` tra i token globali.

---

### 10. `HomeView` non lazy-loaded nel router — Priorità Bassa

**Problema.** `router/index.ts`: `HomeView` è importata staticamente, tutte le altre view usano dynamic import. Il bundle iniziale include il template della home anche quando l'utente atterra su `/rsvp`.

**Soluzione.** Uniformare a `component: () => import('../views/HomeView.vue')` oppure lasciare statica con un commento che giustifica la scelta (above-the-fold).

---

### 12. Font loading: FOUT su connessioni lente — Priorità Bassa

**Problema.** Google Fonts caricato con `display=swap` — su connessioni lente l'utente vede un flash of unstyled text pronunciato per tutti i titoli Raleway uppercase. Nessun `<link rel="preload">` per i font critici.

**Soluzione.** Passare a `display=optional` (nessun FOUT) oppure aggiungere `<link rel="preload" as="font">` per Raleway 400 e 700.

---

### 13. Colori hardcoded in RsvpView — Priorità Bassa

**Problema.** `RsvpView.vue`: `#c0392b`, `#fef0ee`, `#f5c6c2` hardcoded per gli stati di errore invece dei token.

**Soluzione.** Aggiungere `--wedding-error`, `--wedding-error-bg`, `--wedding-error-border` in `base.css`.

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
| 11 | 🟢 Bassa | `vueDevTools()` condizionato a dev | ✅ PR #62 |
| 3 | 🟡 Media | Token duplicati `base.css` / `main.css` | ✅ risolto con PR #61 |
| 6 | 🟡 Media | `aria-label` hamburger dinamico | ✅ era già fatto |
| 9 | 🟢 Bassa | Rimuovere dead code (`icon` prop, `stores/counter.ts`) | ✅ era già fatto |
| 15 | 🟡 Media | `:key="index"` → chiave stabile in `TransitionGroup` RSVP | ✅ era già fatto |
| 7 | 🟡 Media | `BaseButton.vue` componente riutilizzabile | ✅ PR #64 |
| 5 | 🟡 Media | Mix `public/` vs `src/assets/` immagini | ✅ PR #65 |
| 8 | 🟢 Bassa | `--nav-h` in `base.css` | ⬜ aperto |
| 10 | 🟢 Bassa | `HomeView` lazy-loaded | ⬜ aperto |
| 12 | 🟢 Bassa | Font `display=optional` | ⬜ aperto |
| 13 | 🟢 Bassa | Colori errore come token CSS | ⬜ aperto |
