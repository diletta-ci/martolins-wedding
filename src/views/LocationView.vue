<script setup lang="ts">
import LaceDivider from "@/components/LaceDivider.vue";
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Location del matrimonio">
    <div class="page-header-inner">
      <p class="page-eyebrow">Dove ci sposiamo</p>
      <h1 class="page-title">Ganci Farm</h1>
      <p class="page-subtitle">Via Ganci, 15 — Celle Ligure, SV</p>
    </div>

    <!-- Scallop transition into the map -->
    <div class="page-header-scallop" aria-hidden="true">
      <LaceDivider :flip="true" color="var(--wedding-surface)" />
    </div>
  </section>

  <!-- ─── Map ──────────────────────────────────────────────────────────── -->
  <section class="map-section" aria-label="Mappa del luogo">
    <div class="map-wrapper">
      <iframe
        class="map-iframe"
        title="Mappa Ganci Farm, Celle Ligure"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=Via+Ganci+15,+17015+Celle+Ligure+SV+Italia&output=embed"
        allowfullscreen
      />
    </div>

    <!-- Address card overlapping the map bottom -->
    <div class="address-card">
      <div class="address-card-inner">
        <!-- Pin icon -->
        <svg class="address-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
            fill="currentColor"
          />
        </svg>
        <div class="address-text">
          <p class="address-venue">Ganci Farm</p>
          <p class="address-street">Via Ganci, 15</p>
          <p class="address-city">17015 Celle Ligure SV, Italia</p>
        </div>
        <a
          class="directions-btn"
          href="https://maps.app.goo.gl/mQHFNGmcrX75JFb88"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apri indicazioni in Google Maps"
        >
          Ottieni indicazioni
        </a>
      </div>
    </div>
  </section>

  <!-- ─── Divider ───────────────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface-alt)" />

  <!-- ─── Come raggiungerci ─────────────────────────────────────────────── -->
  <section class="travel-section">
    <div class="travel-inner">
      <h2 class="travel-heading">Come raggiungerci</h2>

      <div class="travel-grid">
        <!-- In auto -->
        <div class="travel-card">
          <div class="travel-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 class="travel-card-title">In auto</h3>
          <p class="travel-card-body">
            Dall'autostrada A10 uscire a <strong>Celle Ligure</strong>, poi seguire le indicazioni per Via Ganci. La strada sale verso le colline — si consiglia di non portare auto troppo basse. Parcheggio disponibile in loco.
          </p>
        </div>

        <!-- In treno -->
        <div class="travel-card">
          <div class="travel-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2H18v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm0 2c3.51 0 5.5.32 6 1.32V12H6V5.32C6.5 4.32 8.49 4 12 4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 class="travel-card-title">In treno</h3>
          <p class="travel-card-body">
            La stazione più vicina è <strong>Celle Ligure</strong> sulla linea Genova–Ventimiglia. Da lì circa 15–20 minuti in taxi o auto. Consigliamo di prenotare un transfer in anticipo — sarà nostra cura condividere i contatti di fiducia.
          </p>
        </div>

        <!-- Dall'aeroporto -->
        <div class="travel-card">
          <div class="travel-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 class="travel-card-title">Dall'aeroporto</h3>
          <p class="travel-card-body">
            L'aeroporto più vicino è <strong>Genova Cristoforo Colombo</strong> (GOA), a circa 40 minuti di auto. In alternativa, da <strong>Nizza Côte d'Azur</strong> (NCE) circa 1 h 30 min lungo la costa. Entrambi ben collegati in auto o navetta.
          </p>
        </div>

        <!-- Dove dormire -->
        <div class="travel-card">
          <div class="travel-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 class="travel-card-title">Dove dormire</h3>
          <p class="travel-card-body">
            Celle Ligure e le cittadine limitrofe (<strong>Albisola</strong>, <strong>Savona</strong>) offrono un'ampia scelta di hotel e B&amp;B. Vi invieremo prossimamente una lista di strutture consigliate vicino alla location.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Closing scallop ────────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface)" />
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
  padding-bottom: 2rem; /* clears scallop */
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

/* ── Map section ────────────────────────────────────────────────────────── */
.map-section {
  background-color: var(--wedding-surface);
  padding-bottom: 3rem;
}

.map-wrapper {
  width: 100%;
  aspect-ratio: 16 / 7;
  min-height: 260px;
  overflow: hidden;
}

@media (max-width: 640px) {
  .map-wrapper {
    aspect-ratio: 4 / 3;
  }
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  /* subtle warm tint to echo the invitation palette */
  filter: saturate(0.85) hue-rotate(5deg);
}

/* ── Address card ───────────────────────────────────────────────────────── */
.address-card {
  max-width: var(--content-wide);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.address-card-inner {
  margin-top: -1px; /* flush under map */
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border);
  border-radius: 0.75rem;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  box-shadow: 0 4px 24px rgba(133, 153, 197, 0.12);
}

.address-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  color: var(--wedding-brand);
}

.address-text {
  flex: 1;
  min-width: 160px;
}

.address-venue {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--wedding-ink);
}

.address-street,
.address-city {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--wedding-ink-muted);
  line-height: 1.6;
}

.directions-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.directions-btn:hover {
  background-color: var(--wedding-brand-dark);
}

/* ── Travel section ─────────────────────────────────────────────────────── */
.travel-section {
  background-color: var(--wedding-surface-alt);
  padding: 4.5rem 1.5rem;
}

.travel-inner {
  max-width: var(--content-wide);
  margin: 0 auto;
}

.travel-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 400;
  font-style: italic;
  color: var(--wedding-brand-dark);
  margin-bottom: 2.5rem;
  text-align: center;
}

.travel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.travel-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.travel-card:hover {
  box-shadow: 0 6px 28px rgba(133, 153, 197, 0.15);
  border-color: var(--wedding-border);
}

.travel-card-icon {
  width: 2.25rem;
  height: 2.25rem;
  color: var(--wedding-brand);
  flex-shrink: 0;
}

.travel-card-icon svg {
  width: 100%;
  height: 100%;
}

.travel-card-title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--wedding-ink);
}

.travel-card-body {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
}

.travel-card-body strong {
  color: var(--wedding-ink);
  font-weight: 500;
}
</style>
