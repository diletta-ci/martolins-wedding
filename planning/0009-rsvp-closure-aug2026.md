# Technical Audit — Agosto 2026

Snapshot completo. Il matrimonio è il 29·8·2026 (tra due settimane) — priorità aggiornate di conseguenza.

## Changes since 0008

- 🔴 **Nuovo item ad alta priorità, completato**: chiuso il form RSVP, sostituito con un messaggio per chi non ha ancora risposto (vedi item #18).
- L'item #13 (colori hardcoded in RsvpView) di 0008 è ora **superato**: gli stati di errore del form non esistono più.
- `src/utils/rsvp.ts` e il relativo test sono stati **rimossi** insieme al form — nessuna logica RSVP resta nel codebase.
- Tutti gli altri item aperti in 0008 (#8, #10, #12) restano invariati.

---

## Priorità Alta

### 18. Chiudere il form RSVP — messaggio di cortesia per i ritardatari

**Stato: ✅ Completato**

**Problema.** Il matrimonio era a due settimane: il form RSVP in `RsvpView.vue` non doveva più accettare risposte, ma la pagina non poteva restare vuota o rompersi per chi la visita ancora (link condivisi, curiosi, invitati in ritardo).

**Soluzione implementata.** Rimosso il form (stato, validazione, submit verso Netlify, guest/child list) e sostituito con un messaggio statico che:
- ringrazia chi ha già risposto;
- comunica che il modulo di conferma è chiuso;
- invita chi non ha fatto in tempo (o ha altre domande) a contattare direttamente Marta o Giacomo, senza specificare un canale — copy intenzionalmente generica.

Rimossi anche `src/utils/rsvp.ts` e `src/utils/rsvp.test.ts`: erano usati solo da `RsvpView.vue`, non hanno altri riferimenti nel codebase, e non c'è un piano per riattivare il form.

Il form statico nascosto in `index.html` (per il bot-detection di Netlify Forms) è stato lasciato invariato — è inerte e non compare nel rendering, riattivarlo in futuro richiederebbe comunque di ricostruire form e utils da zero.

---

## Priorità Media (residuo da 0008 — invariato)

Nessun item medio aperto: 0008 aveva già chiuso token duplicati (#3), aria-label hamburger (#6), dead code (#9), `BaseButton.vue` (#7), mix `public/`/`src/assets/` (#5, PR #65), e i punti relativi al form RSVP (#2, #14, #15, #16, #17) sono ora completamente superati dalla rimozione del form.

---

## Priorità Bassa (residuo da 0008 — invariato)

### 8. `--nav-h` scoped su `:root`

**Problema.** `HomeView.vue`: `--nav-h: 3.75rem` dichiarata in `<style scoped>` su `:root`. Gli stili scoped di Vue non funzionano su `:root` — la variabile diventa globale non intenzionale.

**Soluzione.** Spostare `--nav-h: 3.75rem` in `base.css` tra i token globali.

---

### 10. `HomeView` non lazy-loaded nel router

**Problema.** `router/index.ts`: `HomeView` è importata staticamente, tutte le altre view usano dynamic import.

**Soluzione.** Uniformare a `component: () => import('../views/HomeView.vue')` oppure lasciare statica con un commento che giustifica la scelta (above-the-fold).

---

### 12. Font loading: FOUT su connessioni lente

**Problema.** Google Fonts caricato con `display=swap` — su connessioni lente l'utente vede un flash of unstyled text pronunciato per tutti i titoli Raleway uppercase.

**Soluzione.** Passare a `display=optional` oppure aggiungere `<link rel="preload" as="font">` per Raleway 400 e 700.

---

## Riepilogo priorità

| # | Priorità | Item | Stato |
|---|----------|------|-------|
| 18 | 🔴 Alta | Chiudere form RSVP → messaggio per ritardatari | ✅ completato |
| 1 | 🔴 Alta | Deduplicare `.page-header` → `PageHeader.vue` | ✅ PR #50 |
| 2 | 🔴 Alta | Focus visibile radio/checkbox RSVP | ✅ n/a (form rimosso) |
| 14 | 🔴 Alta | Validazione client-side form RSVP | ✅ n/a (form rimosso) |
| 16 | 🟡 Media | `src/utils/rsvp.ts` per testabilità | ✅ n/a (rimosso con il form) |
| 17 | 🟡 Media | Test (Vitest) per il form RSVP | ✅ n/a (rimosso con il form) |
| 15 | 🟡 Media | `:key="index"` chiave stabile in RSVP | ✅ n/a (form rimosso) |
| 13 | 🟢 Bassa | Colori errore come token CSS | ✅ n/a (form rimosso) |
| 4 | 🟡 Media | Rimuovere Tailwind | ✅ PR #61 |
| 3 | 🟡 Media | Token duplicati `base.css` / `main.css` | ✅ risolto con PR #61 |
| 5 | 🟡 Media | Mix `public/` vs `src/assets/` immagini | ✅ PR #65 |
| 6 | 🟡 Media | `aria-label` hamburger dinamico | ✅ era già fatto |
| 7 | 🟡 Media | `BaseButton.vue` componente riutilizzabile | ✅ PR #64 |
| 9 | 🟢 Bassa | Rimuovere dead code (`icon` prop, `stores/counter.ts`) | ✅ era già fatto |
| 11 | 🟢 Bassa | `vueDevTools()` condizionato a dev | ✅ PR #62 |
| 8 | 🟢 Bassa | `--nav-h` in `base.css` | ⬜ aperto |
| 10 | 🟢 Bassa | `HomeView` lazy-loaded | ⬜ aperto |
| 12 | 🟢 Bassa | Font `display=optional` | ⬜ aperto |
