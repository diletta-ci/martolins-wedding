# Technical Audit — Agosto 2026

Snapshot completo. Il matrimonio è il 29·8·2026 (tra due settimane) — priorità aggiornate di conseguenza.

## Changes since 0006

- 🔴 **Nuovo item ad alta priorità**: chiudere il form RSVP e sostituirlo con un messaggio per chi non ha ancora risposto.
- Tutti gli altri item restano allo stesso stato di 0006 (nessuno risolto nel frattempo).

---

## Priorità Alta

### 18. Chiudere il form RSVP — messaggio di cortesia per i ritardatari

**Problema.** Il matrimonio è tra due settimane: il form RSVP in `RsvpView.vue` non deve più accettare risposte, ma la pagina non può restare vuota o rompersi per chi la visita ancora (link condivisi, curiosi, invitati in ritardo).

**Soluzione.** Rimuovere il form (tutta la logica di stato, validazione, submit verso Netlify) e sostituirlo con un messaggio statico che:
- ringrazia chi ha già risposto;
- comunica che il matrimonio è vicino e le risposte sono chiuse;
- invita chi non ha fatto in tempo a contattare direttamente Marta o Giacomo se vuole partecipare comunque, con la promessa di organizzare.

Copy indicativa (da rifinire in tono con `shared:playtomic-ux-content-design` o a mano):

> Il matrimonio è vicino! Grazie a tutti quelli che hanno già risposto.
> Se non sei riuscito a confermare in tempo e vuoi venire comunque, contattaci direttamente — Marta o Giacomo — saremo felici di organizzarci.

**Implementazione.**
- Mantenere il `page-header` esistente (eyebrow/title/subtitle) — coerente con le altre view.
- Sostituire il blocco form con un componente/markup di messaggio centrato, stile coerente con `.page-header` + surface bianca.
- Aggiungere un modo per contattare Marta/Giacomo (email/telefono/WhatsApp — **da chiedere all'utente quale recapito mostrare**).
- Rimuovere o commentare la route/logica Netlify Forms se non serve più raccogliere submission (valutare se lasciare il form nascosto nel markup per Netlify build-bot detection, se necessario — verificare se Netlify richiede il form statico presente in build per continuare a funzionare in futuro, altrimenti si può rimuovere del tutto).
- Aggiornare eventuali link/nav che promettono "Rispondi al RSVP" per riflettere la chiusura.

**Nota:** i punti 14, 15, 16, 17 (validazione, chiavi stabili, estrazione logica, test) relativi al form RSVP diventano **irrilevanti** una volta rimosso il form — non serve più lavorarci. `src/utils/rsvp.ts` e `src/utils/rsvp.test.ts` restano nel repo (non importati da nessuna view) in caso servano per riattivare il form in futuro.

---

## Priorità Alta (esistenti da 0006)

### 1. Deduplicare `.page-header` e `.page-title-img`
✅ Completato — PR #50

### 2. Focus visibile su custom radio/checkbox in RSVP
✅ Completato — PR #50 — **diventa irrilevante dopo item #18** (il form viene rimosso)

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

**Stato: irrilevante dopo item #18** (il form RSVP con guest/child list viene rimosso).

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

**Stato: irrilevante dopo item #18** (gli stati di errore del form vengono rimossi insieme al form).

---

## Form RSVP — Bug e testabilità (storico, pre-chiusura)

Sezione mantenuta per storico. Con l'item #18, il form viene rimosso e questi punti non si applicano più al codice attuale.

### 14. Validazione client-side mancante
✅ Completato — PR #50 — **superato da item #18**

### 16. Logica pura non testabile senza montare il componente
✅ Completato — PR #52 — **superato da item #18** (logica non più in uso, ma il file resta nel repo per un eventuale futuro riutilizzo)

### 17. Nessun test sul form RSVP
✅ Completato — PR #54 — **superato da item #18** (i test del form andranno rimossi/aggiornati)

---

## Riepilogo priorità

| # | Priorità | Item | Stato |
|---|----------|------|-------|
| 18 | 🔴 Alta | **Chiudere form RSVP → messaggio per ritardatari** | ⬜ aperto — **nuovo, oggi** |
| 1 | 🔴 Alta | Deduplicare `.page-header` → `PageHeader.vue` | ✅ PR #50 |
| 2 | 🔴 Alta | Focus visibile radio/checkbox RSVP | ✅ PR #50 (irrilevante dopo #18) |
| 14 | 🔴 Alta | Validazione client-side form RSVP | ✅ PR #50 (irrilevante dopo #18) |
| 16 | 🟡 Media | Estrarre logica RSVP in `src/utils/rsvp.ts` | ✅ PR #52 (irrilevante dopo #18) |
| 17 | 🟡 Media | Test (Vitest) per il form RSVP | ✅ PR #54 (irrilevante dopo #18) |
| 4 | 🟡 Media | Rimuovere Tailwind | ✅ PR #61 |
| 3 | 🟡 Media | Token duplicati `base.css` / `main.css` | ⬜ aperto |
| 5 | 🟡 Media | Mix `public/` vs `src/assets/` immagini | ⬜ aperto |
| 6 | 🟡 Media | `aria-label` hamburger dinamico | ⬜ aperto |
| 7 | 🟡 Media | `BaseButton.vue` componente riutilizzabile | ⬜ aperto |
| 15 | 🟡 Media | `:key="index"` chiave stabile in RSVP | ✅ n/a (irrilevante dopo #18) |
| 8 | 🟢 Bassa | `--nav-h` in `base.css` | ⬜ aperto |
| 9 | 🟢 Bassa | Rimuovere dead code (`icon` prop, `stores/counter.ts`) | ⬜ aperto |
| 10 | 🟢 Bassa | `HomeView` lazy-loaded | ⬜ aperto |
| 11 | 🟢 Bassa | `vueDevTools()` condizionato a dev | ⬜ aperto |
| 12 | 🟢 Bassa | Font `display=optional` | ⬜ aperto |
| 13 | 🟢 Bassa | Colori errore come token CSS | ✅ n/a (irrilevante dopo #18) |
