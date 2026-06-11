<script setup lang="ts"></script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Location del matrimonio">
    <img src="/tit-location.png" alt="Location" class="page-title-img" />
  </section>

  <!-- ─── Location: Ganci Farm ─────────────────────────────────────────── -->
  <section class="locations-section" aria-label="La location">
    <div class="locations-inner locations-inner--single">
      <article class="location-card">
        <div class="location-map">
          <iframe
            title="Mappa Ganci Farm, Via Ganci 15, Celle Ligure"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Via+Ganci+15,+17015+Celle+Ligure+SV+Italia&output=embed"
            allowfullscreen
          />
        </div>
        <div class="location-info">
          <p class="location-eyebrow">Cerimonia e ricevimento</p>
          <h2 class="location-title">Ganci Farm</h2>
          <p class="location-address">
            Via Ganci, 15<br />
            17015 Celle Ligure SV
          </p>
          <p class="location-note">È disponibile il parcheggio della location.</p>
          <a
            class="location-btn"
            href="https://maps.app.goo.gl/mQHFNGmcrX75JFb88"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indicazioni
          </a>
        </div>
      </article>
    </div>
  </section>

  <!-- ─── Il posto è grande: illustrated map ───────────────────────────── -->
  <section class="map-section" aria-label="Mappa della location">
    <div class="map-section-inner">
      <p class="map-eyebrow">Orientati</p>
      <h2 class="map-title">Il posto è grande</h2>
      <p class="map-body">
        La cerimonia sta da una parte e il ricevimento dall'altra, ma alla fine
        è tutto nello stesso posto. Come si vede da questa mappa.
      </p>
      <img
        src="/mappa-ganci.png"
        alt="Mappa illustrata di Ganci Farm con cerimonia, ricevimento e parcheggio"
        class="map-illustrated"
      />
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

/* ── "Il posto è grande" map section ───────────────────────────────────── */
.map-section {
  background-color: var(--wedding-surface-alt);
  padding: 4.5rem 1.5rem;
  text-align: center;
}

.map-section-inner {
  max-width: var(--content-wide);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.map-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--wedding-brand-dark);
}

.map-title {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-ink);
}

.map-body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
  max-width: 36rem;
}

.map-illustrated {
  margin-top: 1rem;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
}

/* ── Location card ──────────────────────────────────────────────────────── */
.locations-section {
  background-color: var(--wedding-surface);
  padding: 4rem 1.5rem 4.5rem;
}

.locations-inner {
  max-width: var(--content-wide);
  margin: 0 auto;
}

.locations-inner--single {
  max-width: 520px;
}

.location-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(141, 166, 212, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.location-card:hover {
  box-shadow: 0 8px 32px rgba(141, 166, 212, 0.18);
}

.location-map {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--wedding-brand-pale);
}

.location-map iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  filter: saturate(0.85) hue-rotate(5deg);
}

.location-info {
  padding: 1.75rem 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.location-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--wedding-brand-dark);
}

.location-title {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.6vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--wedding-ink);
  margin-bottom: 0.25rem;
}

.location-address {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--wedding-ink-muted);
}

.location-note {
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--wedding-ink-muted);
  font-style: italic;
  margin-top: 0.25rem;
}

.location-btn {
  margin-top: 1.1rem;
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.location-btn:hover {
  background-color: var(--wedding-brand-dark);
}
</style>
