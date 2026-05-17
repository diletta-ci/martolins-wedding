<script setup lang="ts"></script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Location del matrimonio">
    <div class="page-header-inner">
      <p class="page-eyebrow">Dove ci sposiamo</p>
      <h1 class="page-title">Location</h1>
      <p class="page-subtitle">29 · 8 · 2026</p>
    </div>
  </section>

  <!-- ─── Locations: ceremony + reception ──────────────────────────────── -->
  <section class="locations-section" aria-label="Le due location">
    <div class="locations-inner">
      <!-- Cerimonia civile -->
      <article class="location-card">
        <div class="location-map">
          <iframe
            title="Mappa luogo della cerimonia, Via Mezzalunga 2, Celle Ligure"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Via+Mezzalunga+2,+17015+Celle+Ligure+SV+Italia&output=embed"
            allowfullscreen
          />
        </div>
        <div class="location-info">
          <p class="location-eyebrow">Ore 11:30</p>
          <h2 class="location-title">Cerimonia civile</h2>
          <p class="location-address">
            Via Mezzalunga, 2<br />
            17015 Celle Ligure SV
          </p>
          <a
            class="location-btn"
            href="https://www.google.com/maps/dir/?api=1&destination=Via+Mezzalunga+2,+17015+Celle+Ligure+SV+Italia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Indicazioni
          </a>
        </div>
      </article>

      <!-- Ricevimento -->
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
          <p class="location-eyebrow">Pranzo ore 13:30</p>
          <h2 class="location-title">Ricevimento</h2>
          <p class="location-venue">Ganci Farm</p>
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

  <!-- ─── Servizio navetta ─────────────────────────────────────────────── -->
  <section class="shuttle-section" aria-label="Servizio navetta">
    <div class="shuttle-inner">
      <h2 class="section-heading">Servizio navetta</h2>
      <p class="shuttle-intro">
        Dal luogo della cerimonia al ricevimento sarà disponibile un servizio
        navetta per chi non ha un mezzo proprio o nel caso si volesse lasciare
        la propria auto nel luogo della cerimonia a Celle Ligure.
      </p>

      <div class="shuttle-grid">
        <div class="shuttle-card">
          <h3 class="shuttle-card-title">Andata</h3>
          <p>
            La partenza della navetta è prevista alla fine della cerimonia dal
            parcheggio davanti ai
            <a
              href="https://www.google.com/maps/search/?api=1&query=Giardini+Mezzalunga+Celle+Ligure"
              target="_blank"
              rel="noopener noreferrer"
              >Giardini Mezzalunga</a
            >
            di Celle Ligure.
          </p>
        </div>

        <div class="shuttle-card">
          <h3 class="shuttle-card-title">Ritorno</h3>
          <p>
            Il ritorno della navetta è previsto dal luogo del ricevimento, Ganci
            Farm, alle <strong>ore 23:00</strong>
            <span class="muted-note">(orario ancora da confermare)</span>.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Come raggiungere Celle Ligure ────────────────────────────────── -->
  <section class="travel-section" aria-label="Come raggiungere Celle Ligure">
    <div class="travel-inner">
      <h2 class="section-heading">Come raggiungere Celle Ligure</h2>

      <div class="travel-grid">
        <div class="travel-card">
          <h3 class="travel-card-title">Da Torino</h3>
          <p>
            In auto si percorre la <strong>A6 Torino–Savona</strong> e, una
            volta a Savona, si prosegue sulla <strong>A10</strong> in direzione
            Ventimiglia fino all'uscita <strong>Celle Ligure</strong>. Il
            viaggio dura circa due ore.
          </p>
          <p>
            In treno la tratta più comoda è <strong>Torino Porta Nuova</strong>
            → <strong>Genova Piazza Principe</strong>, con cambio sulla linea
            Genova–Ventimiglia fino alla stazione di
            <strong>Celle Ligure</strong>.
          </p>
        </div>

        <div class="travel-card">
          <h3 class="travel-card-title">Da Genova</h3>
          <p>
            In auto si imbocca la <strong>A10</strong> in direzione Ventimiglia
            e si esce a <strong>Celle Ligure</strong>: circa 40 minuti di
            viaggio, traffico permettendo.
          </p>
          <p>
            In treno la linea <strong>Genova–Ventimiglia</strong> ferma
            direttamente alla stazione di <strong>Celle Ligure</strong> in
            circa 50 minuti, con corse frequenti durante la giornata.
          </p>
        </div>
      </div>
    </div>
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
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
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

/* ── Locations: two columns ─────────────────────────────────────────────── */
.locations-section {
  background-color: var(--wedding-surface);
  padding: 4rem 1.5rem 4.5rem;
}

.locations-inner {
  max-width: var(--content-wide);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 820px) {
  .locations-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

.location-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(133, 153, 197, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.location-card:hover {
  box-shadow: 0 8px 32px rgba(133, 153, 197, 0.18);
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

.location-venue {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--wedding-ink);
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

/* ── Shuttle section ────────────────────────────────────────────────────── */
.shuttle-section {
  background-color: var(--wedding-surface-alt);
  padding: 4.5rem 1.5rem;
}

.shuttle-inner {
  max-width: 56rem;
  margin: 0 auto;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-brand-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.shuttle-intro {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.75;
  color: var(--wedding-ink);
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 2.5rem;
}

.shuttle-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .shuttle-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.shuttle-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.shuttle-card:hover {
  box-shadow: 0 6px 28px rgba(133, 153, 197, 0.15);
  border-color: var(--wedding-border);
}

.shuttle-card-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--wedding-brand-dark);
}

.shuttle-card p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
}

.shuttle-card a {
  color: var(--wedding-brand-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;
}

.shuttle-card a:hover {
  color: var(--wedding-brand);
}

.shuttle-card strong {
  color: var(--wedding-ink);
  font-weight: 600;
}

.muted-note {
  color: var(--wedding-ink-faint);
  font-size: 0.8125rem;
  font-style: italic;
}

/* ── Travel section ─────────────────────────────────────────────────────── */
.travel-section {
  background-color: var(--wedding-surface);
  padding: 4.5rem 1.5rem;
}

.travel-inner {
  max-width: var(--content-wide);
  margin: 0 auto;
}

.travel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.75rem;
}

.travel-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.travel-card:hover {
  box-shadow: 0 6px 28px rgba(133, 153, 197, 0.15);
  border-color: var(--wedding-border);
}

.travel-card-title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--wedding-brand-dark);
}

.travel-card p {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
}

.travel-card strong {
  color: var(--wedding-ink);
  font-weight: 600;
}
</style>
