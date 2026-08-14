# Technical Audit — Agosto 2026 (aggiornamento)

Snapshot completo. Il matrimonio è il 29·8·2026.

## Changes since 0009

- ✅ Chiusi gli ultimi tre item a bassa priorità rimasti aperti da 0008/0009:
  - #8 `--nav-h` spostato in `base.css` come token condiviso (PR #68)
  - #10 `HomeView` ora lazy-loaded come tutte le altre route (PR #69)
  - #12 Font Google caricati con `display=optional` per evitare il FOUT (PR #70)
- 🔴 **Nuovo bug, corretto**: il menu mobile (hamburger drawer) spingeva in basso tutto il contenuto della pagina invece di sovrapporsi. Vedi item #19.

---

## Priorità Alta

### 19. Menu mobile che spinge il contenuto invece di sovrapporsi

**Stato: ✅ Completato**

**Problema.** `.nav-drawer` in `AppNav.vue` era un normale elemento di flusso, fratello di `.nav-inner` dentro `.app-nav`. Quando il menu hamburger veniva aperto su mobile, il drawer occupava spazio nel layout e spingeva in basso tutto il contenuto della pagina sottostante, invece di apparire sopra come un overlay.

**Soluzione implementata.** `.app-nav` è già `position: sticky`, quindi costituisce un contesto di posizionamento. Impostato `.nav-drawer` a `position: absolute` (ancorato con `top: 100%`), con `background-color` e `box-shadow` per separarlo visivamente dal contenuto sottostante. Verificato su viewport mobile (390×844) su home e RSVP: il contenuto resta fermo, il drawer si sovrappone correttamente, nessun salto di scroll alla chiusura.

---

## Priorità Media

Nessun item aperto.

---

## Priorità Bassa

Nessun item aperto — tutti gli item residui da 0008/0009 sono stati chiusi (vedi "Changes since 0009").

---

## Riepilogo priorità

| # | Priorità | Item | Stato |
|---|----------|------|-------|
| 19 | 🔴 Alta | Menu mobile overlay invece di push-down | ✅ PR #71 |
| 18 | 🔴 Alta | Chiudere form RSVP → messaggio per ritardatari | ✅ completato |
| 1 | 🔴 Alta | Deduplicare `.page-header` → `PageHeader.vue` | ✅ PR #50 |
| 4 | 🟡 Media | Rimuovere Tailwind | ✅ PR #61 |
| 3 | 🟡 Media | Token duplicati `base.css` / `main.css` | ✅ risolto con PR #61 |
| 5 | 🟡 Media | Mix `public/` vs `src/assets/` immagini | ✅ PR #65 |
| 6 | 🟡 Media | `aria-label` hamburger dinamico | ✅ era già fatto |
| 7 | 🟡 Media | `BaseButton.vue` componente riutilizzabile | ✅ PR #64 |
| 8 | 🟢 Bassa | `--nav-h` in `base.css` | ✅ PR #68 |
| 9 | 🟢 Bassa | Rimuovere dead code (`icon` prop, `stores/counter.ts`) | ✅ era già fatto |
| 10 | 🟢 Bassa | `HomeView` lazy-loaded | ✅ PR #69 |
| 11 | 🟢 Bassa | `vueDevTools()` condizionato a dev | ✅ PR #62 |
| 12 | 🟢 Bassa | Font `display=optional` | ✅ PR #70 |

Nessun item aperto al momento. Prossimo audit da fare solo se emergono nuove necessità.
