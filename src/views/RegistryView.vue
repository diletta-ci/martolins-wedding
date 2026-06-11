<script setup lang="ts">
// Replace this placeholder with the real URL before launch
const PAYPAL_URL = "#paypal-placeholder";

const IBAN = "IT26 R036 6901 6008 9464 0322 584";
const BIC = "REVOITM2";
const BANK_BENEFICIARY = "Giacomo Andreoli & Marta Zoe Cagliero";
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Regalo">
    <img src="/tit-regalo.png" alt="Regalo" class="page-title-img" />
  </section>

  <!-- ─── Intro ────────────────────────────────────────────────────────── -->
  <section class="intro-section">
    <div class="intro-inner">
      <p class="intro-text">
        La vostra presenza è il regalo più grande che potessimo desiderare.
        In caso voleste contribuire al nostro viaggio di nozze, ecco qualche
        modo per farlo — con tutto il nostro affetto e gratitudine.
      </p>
    </div>
  </section>

  <!-- ─── Gift cards ───────────────────────────────────────────────────── -->
  <section class="gifts-section" aria-label="Modi per fare un regalo">
    <div class="gifts-inner">
      <h2 class="gifts-heading">Come contribuire</h2>

      <div class="gifts-grid">

        <!-- IBAN -->
        <div class="gift-card gift-card--primary">
          <div class="gift-card-icon" aria-hidden="true">
            <!-- Bank / transfer icon -->
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zm-8 9h19v-3H2v3zm14-9v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
            </svg>
          </div>
          <div class="gift-card-body">
            <h3 class="gift-card-title">Bonifico Bancario</h3>
            <p class="gift-card-desc">
              Preferite il classico bonifico? Eccovi i dati per il trasferimento.
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
                <span class="iban-label">BIC / SWIFT</span>
                <span class="iban-value iban-mono">{{ BIC }}</span>
              </div>
            </div>
          </div>
        </div>

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

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Page header ────────────────────────────────────────────────────────── */
.page-header {
  background-color: var(--wedding-brand);
  background-image: radial-gradient(
    ellipse 70% 80% at 50% 40%,
    rgba(255, 255, 255, 0.09) 0%,
    transparent 70%
  );
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title-img {
  width: 100%;
  max-width: var(--content-wide);
  height: auto;
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
  font-family: var(--font-body);
  font-size: clamp(1.0625rem, 2.5vw, 1.25rem);
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
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
  box-shadow: 0 6px 28px rgba(141, 166, 212, 0.15);
  border-color: var(--wedding-border);
}

.gift-card--primary {
  border-color: var(--wedding-border);
  box-shadow: 0 2px 12px rgba(141, 166, 212, 0.1);
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

</style>
