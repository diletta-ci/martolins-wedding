<script setup lang="ts">
import LaceDivider from "@/components/LaceDivider.vue";

// Replace these placeholders with real URLs before launch
const PAYPAL_URL = "#paypal-placeholder";
const AMAZON_URL = "#amazon-placeholder";
const WISHLIST_URL = "#wishlist-placeholder";

// Replace with real IBAN details before launch
const IBAN = "IT00 A000 0000 0000 0000 0000 000";
const BANK_BENEFICIARY = "Marta Cognome & Giacomo Cognome";
const BANK_CAUSALE = "Regalo matrimonio Marta & Giacomo";
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Lista nozze">
    <div class="page-header-inner">
      <p class="page-eyebrow">Il vostro pensiero</p>
      <h1 class="page-title">Lista Nozze</h1>
      <p class="page-subtitle">29 · 8 · 2026 — Celle Ligure</p>
    </div>

    <div class="page-header-scallop" aria-hidden="true">
      <LaceDivider :flip="true" color="var(--wedding-surface)" />
    </div>
  </section>

  <!-- ─── Intro ────────────────────────────────────────────────────────── -->
  <section class="intro-section">
    <div class="intro-inner">
      <p class="intro-text">
        La vostra presenza è il regalo più grande che potessimo desiderare.
        Se però volete lasciarci un pensiero, ecco qualche modo per farlo —
        con tutto il nostro affetto e gratitudine.
      </p>
    </div>
  </section>

  <!-- ─── Divider ───────────────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface-alt)" />

  <!-- ─── Gift cards ───────────────────────────────────────────────────── -->
  <section class="gifts-section" aria-label="Modi per fare un regalo">
    <div class="gifts-inner">
      <h2 class="gifts-heading">Come contribuire</h2>

      <div class="gifts-grid">

        <!-- PayPal -->
        <div class="gift-card gift-card--primary">
          <div class="gift-card-icon" aria-hidden="true">
            <!-- PayPal-style wallet icon -->
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V10h16v8zm0-10H4V6h16v2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="gift-card-body">
            <h3 class="gift-card-title">Contributo PayPal</h3>
            <p class="gift-card-desc">
              Il modo più semplice e veloce. Basta un clic per inviarci
              un pensiero direttamente online.
            </p>
          </div>
          <a
            :href="PAYPAL_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="gift-btn gift-btn--solid"
            aria-label="Invia un contributo via PayPal"
          >
            Invia via PayPal
          </a>
        </div>

        <!-- IBAN -->
        <div class="gift-card gift-card--primary">
          <div class="gift-card-icon" aria-hidden="true">
            <!-- Bank / transfer icon -->
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zm-8 9h19v-3H2v3zM14 10v7h3v-7h-3zm4.5-9l-9.5 5h19L18.5 1z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="gift-card-body">
            <h3 class="gift-card-title">Bonifico Bancario</h3>
            <p class="gift-card-desc">
              Preferite il classico bonifico? Eccovi i dati per il
              trasferimento — intestato a entrambi e pronto per la causale.
            </p>
            <div class="iban-block" aria-label="Dati bancari">
              <div class="iban-row">
                <span class="iban-label">Beneficiario</span>
                <span class="iban-value">{{ BANK_BENEFICIARY }}</span>
              </div>
              <div class="iban-row">
                <span class="iban-label">IBAN</span>
                <span class="iban-value iban-mono">{{ IBAN }}</span>
              </div>
              <div class="iban-row">
                <span class="iban-label">Causale</span>
                <span class="iban-value">{{ BANK_CAUSALE }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Amazon wishlist -->
        <div class="gift-card">
          <div class="gift-card-icon" aria-hidden="true">
            <!-- Shopping bag / list icon -->
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-1.66 0-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1h2c0 1.66-1.34 3-3 3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="gift-card-body">
            <h3 class="gift-card-title">Lista Amazon</h3>
            <p class="gift-card-desc">
              Abbiamo selezionato alcuni oggetti per la nostra nuova casa.
              Trovate tutto sulla nostra lista Amazon — dal grande al piccolo.
            </p>
          </div>
          <a
            :href="AMAZON_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="gift-btn gift-btn--outline"
            aria-label="Vai alla lista Amazon"
          >
            Vai alla lista
            <svg class="gift-btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <!-- Other wishlist -->
        <div class="gift-card">
          <div class="gift-card-icon" aria-hidden="true">
            <!-- Heart / gift icon -->
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7h-1.26A4.5 4.5 0 0 0 13 3.5a4.5 4.5 0 0 0-9 1A4 4 0 0 0 4 12h1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8h1a4 4 0 0 0 0-8zM11 19H6v-7h5v7zm7 0h-5v-7h5v7zM9.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="gift-card-body">
            <h3 class="gift-card-title">Lista Regali</h3>
            <p class="gift-card-desc">
              Hai in mente qualcosa di speciale? Consulta la nostra lista
              desideri per idee e ispirazioni per tutti i gusti e budget.
            </p>
          </div>
          <a
            :href="WISHLIST_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="gift-btn gift-btn--outline"
            aria-label="Vai alla lista regali"
          >
            Vai alla lista
            <svg class="gift-btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

      </div>
    </div>
  </section>

  <!-- ─── Closing divider + note ───────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface)" />

  <section class="closing-section" aria-label="Nota conclusiva">
    <p class="closing-text">
      Grazie di cuore per ogni pensiero e per essere qui con noi. ♡
    </p>
  </section>
</template>

<style scoped>
/* ── Page header ────────────────────────────────────────────────────────── */
.page-header {
  position: relative;
  background-color: var(--wedding-brand);
  background-image: radial-gradient(
    ellipse 70% 80% at 50% 40%,
    rgba(255, 255, 255, 0.09) 0%,
    transparent 70%
  );
  padding: 5rem 1.5rem 4rem;
  text-align: center;
  overflow: hidden;
}

.page-header-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 2rem;
}

.page-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 10vw, 5rem);
  font-weight: 400;
  color: var(--wedding-white);
  line-height: 1.05;
  text-shadow: 0 2px 20px rgba(70, 80, 120, 0.2);
}

.page-subtitle {
  font-family: var(--font-heading);
  font-size: clamp(0.75rem, 2.2vw, 0.9375rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 0.25rem;
}

.page-header-scallop {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
}

/* ── Intro ──────────────────────────────────────────────────────────────── */
.intro-section {
  background-color: var(--wedding-surface);
  padding: 3.5rem 1.5rem 2.5rem;
}

.intro-inner {
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
}

.intro-text {
  font-family: var(--font-heading);
  font-size: clamp(1.0625rem, 2.5vw, 1.25rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.8;
  color: var(--wedding-ink-muted);
}

/* ── Gifts section ──────────────────────────────────────────────────────── */
.gifts-section {
  background-color: var(--wedding-surface-alt);
  padding: 4.5rem 1.5rem;
}

.gifts-inner {
  max-width: 56rem;
  margin: 0 auto;
}

.gifts-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 400;
  font-style: italic;
  color: var(--wedding-brand-dark);
  margin-bottom: 2.5rem;
  text-align: center;
}

.gifts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* ── Gift card ──────────────────────────────────────────────────────────── */
.gift-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.875rem;
  padding: 2rem 1.875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.gift-card:hover {
  box-shadow: 0 6px 28px rgba(133, 153, 197, 0.15);
  border-color: var(--wedding-border);
}

.gift-card--primary {
  border-color: var(--wedding-border);
  box-shadow: 0 2px 12px rgba(133, 153, 197, 0.1);
}

.gift-card-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--wedding-brand);
  flex-shrink: 0;
}

.gift-card-icon svg {
  width: 100%;
  height: 100%;
}

.gift-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gift-card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--wedding-ink);
}

.gift-card-desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
}

/* ── IBAN block ─────────────────────────────────────────────────────────── */
.iban-block {
  margin-top: 0.75rem;
  background: var(--wedding-brand-pale);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.5rem;
  padding: 1rem 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.iban-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 0.75rem;
  align-items: baseline;
}

.iban-label {
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--wedding-brand-dark);
  flex-shrink: 0;
  min-width: 6rem;
}

.iban-value {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--wedding-ink);
  line-height: 1.5;
}

.iban-mono {
  font-family: "SFMono-Regular", "Consolas", "Liberation Mono", monospace;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  color: var(--wedding-brand-dark);
  font-weight: 500;
  word-break: break-all;
}

/* ── Gift buttons ───────────────────────────────────────────────────────── */
.gift-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.7rem 1.5rem;
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
  align-self: flex-start;
}

.gift-btn--solid {
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  border: 1.5px solid transparent;
}

.gift-btn--solid:hover {
  background-color: var(--wedding-brand-dark);
}

.gift-btn--outline {
  background-color: transparent;
  color: var(--wedding-brand);
  border: 1.5px solid var(--wedding-brand-light);
}

.gift-btn--outline:hover {
  background-color: var(--wedding-brand-pale);
  border-color: var(--wedding-brand);
}

.gift-btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* ── Closing note ───────────────────────────────────────────────────────── */
.closing-section {
  background-color: var(--wedding-surface);
  padding: 3rem 1.5rem 4rem;
  text-align: center;
}

.closing-text {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.125rem);
  color: var(--wedding-brand);
  line-height: 1.4;
}
</style>
