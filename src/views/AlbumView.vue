<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Album fotografico">
    <div class="page-header-inner">
      <p class="page-eyebrow">I vostri ricordi</p>
      <h1 class="page-title">Foto &amp; Video</h1>
      <p class="page-subtitle">29 · 8 · 2026 — Celle Ligure</p>
    </div>
  </section>

  <!-- ─── Intro ────────────────────────────────────────────────────────── -->
  <section class="intro-section">
    <div class="intro-inner">
      <p class="intro-text">
        Ogni sguardo, ogni abbraccio, ogni momento di gioia — visti attraverso i vostri occhi.
        Qui trovi un modo semplice per condividere con noi tutte le foto e i video che hai fatto
        durante il grande giorno. Usa il link qui sotto per accedere all'album e carica i tuoi
        scatti: sarà il nostro modo di rivivere questa giornata insieme, ancora e ancora.
      </p>
    </div>
  </section>

  <!-- ─── CTA ──────────────────────────────────────────────────────────── -->
  <section class="cta-section" aria-label="Accedi all'album">
    <div class="cta-inner">
      <div class="cta-card">
        <div class="cta-icon" aria-hidden="true">
          <!-- Camera icon -->
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5zm7-10.5h-1.76l-1.37-1.5H8.13L6.76 5H5A3 3 0 0 0 2 8v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 class="cta-title">Aggiungi le tue foto all'album</h2>
        <p class="cta-desc">
          L'album è ospitato su <strong>WedShoots</strong>, un servizio gratuito pensato
          appositamente per i matrimoni. Puoi accedere direttamente dal browser o scaricare
          l'app sul tuo smartphone — nessuna registrazione richiesta, basta il codice dell'album.
        </p>
        <a
          href="#wedshoots-placeholder"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn"
          aria-label="Apri l'album WedShoots"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Apri l'album
        </a>
        <p class="cta-note">
          Il link sarà attivo il giorno del matrimonio — tornateci il 29 agosto!
        </p>
      </div>
    </div>
  </section>

  <!-- ─── How it works ─────────────────────────────────────────────────── -->
  <section class="how-section" aria-label="Come funziona">
    <div class="how-inner">
      <h2 class="how-heading">Come funziona</h2>
      <ol class="steps-list" aria-label="Passi per condividere le foto">

        <li class="step">
          <div class="step-number" aria-hidden="true">1</div>
          <div class="step-body">
            <h3 class="step-title">Scarica l'app WedShoots</h3>
            <p class="step-desc">
              Disponibile gratuitamente su App Store e Google Play. In alternativa
              puoi usare l'album direttamente dal browser senza scaricare nulla.
            </p>
            <div class="store-badges">
              <a
                href="https://apps.apple.com/it/app/wedshoots/id660256196"
                target="_blank"
                rel="noopener noreferrer"
                class="store-badge"
                aria-label="Scarica su App Store"
              >
                <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="120" height="40" rx="6" fill="#1c1b18"/>
                  <text x="32" y="14" font-family="var(--font-heading)" font-size="7" fill="rgba(255,255,255,0.7)" letter-spacing="1">SCARICA SU</text>
                  <text x="32" y="27" font-family="var(--font-heading)" font-size="13" font-weight="700" fill="white">App Store</text>
                  <path d="M14 20c0-3.3 2.7-4.9 2.8-5-1.5-2.2-3.9-2.5-4.7-2.5-2 0-3.9 1.2-4.9 1.2-1 0-2.6-1.1-4.3-1.1C.7 12.6-1.7 14.3-1.7 19c0 2.9 1.1 5.9 2.5 7.9 1.3 1.9 2.4 3.5 4 3.5 1.6 0 2.2-1 4.2-1 2 0 2.5 1 4.2 1 1.7 0 2.9-1.7 4-3.6.8-1.3 1.1-2.6 1.1-2.6S14 22.5 14 20z" fill="white" transform="translate(8,6) scale(0.65)"/>
                </svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=net.bodas.android.wedshoots"
                target="_blank"
                rel="noopener noreferrer"
                class="store-badge"
                aria-label="Scarica su Google Play"
              >
                <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="120" height="40" rx="6" fill="#1c1b18"/>
                  <text x="32" y="14" font-family="var(--font-heading)" font-size="7" fill="rgba(255,255,255,0.7)" letter-spacing="1">DISPONIBILE SU</text>
                  <text x="32" y="27" font-family="var(--font-heading)" font-size="13" font-weight="700" fill="white">Google Play</text>
                  <path d="M5 2.5L17 12 5 21.5V2.5z" fill="#4CAF50" transform="translate(7,9) scale(0.75)"/>
                  <path d="M1 1l12 11L1 23V1z" fill="#2196F3" transform="translate(7,9) scale(0.75)"/>
                  <path d="M1 1l8 12-8 10" fill="#F44336" transform="translate(7,9) scale(0.75)"/>
                  <path d="M1 23l12-11L9 8" fill="#FFEB3B" transform="translate(7,9) scale(0.75)"/>
                </svg>
              </a>
            </div>
          </div>
        </li>

        <li class="step">
          <div class="step-number" aria-hidden="true">2</div>
          <div class="step-body">
            <h3 class="step-title">Inserisci il codice dell'album</h3>
            <p class="step-desc">
              Apri l'app e inserisci il codice dell'album che trovi nel link sopra.
              Il codice permette di accedere all'album privato di Marta &amp; Giacomo
              senza bisogno di creare un account.
            </p>
          </div>
        </li>

        <li class="step">
          <div class="step-number" aria-hidden="true">3</div>
          <div class="step-body">
            <h3 class="step-title">Carica le tue foto e goditi il momento!</h3>
            <p class="step-desc">
              Condividi tutti gli scatti che vuoi — foto e video in alta definizione.
              Puoi aggiungere filtri, mettere like e commentare le foto degli altri ospiti.
              Potrai anche vedere le foto in tempo reale durante la festa!
            </p>
          </div>
        </li>

      </ol>
    </div>
  </section>

  <!-- ─── Features ─────────────────────────────────────────────────────── -->
  <section class="features-section" aria-label="Funzionalità">
    <div class="features-inner">
      <h2 class="features-heading">Cosa puoi fare con WedShoots</h2>
      <ul class="features-grid" role="list">
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 14l-5-5 1.4-1.4L12 14.2l7.6-7.6L21 8l-9 9z"/></svg>
          </div>
          <p class="feature-label">Caricamento illimitato di foto e video</p>
        </li>
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
          </div>
          <p class="feature-label">Album privato — solo gli invitati accedono</p>
        </li>
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <p class="feature-label">Like e commenti sulle foto di tutti</p>
        </li>
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
          </div>
          <p class="feature-label">Foto in tempo reale durante la festa</p>
        </li>
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </div>
          <p class="feature-label">Download in alta definizione per tutti</p>
        </li>
        <li class="feature-item">
          <div class="feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.6 11.5c.4.4 1 .4 1.4 0l3.8-3.8c.4-.4.4-1 0-1.4l-7.9-7.9c-.4-.4-1-.4-1.4 0l-3.8 3.8c-.4.4-.4 1 0 1.4l7.9 7.9zm-2.7-8.6 6.5 6.5-3.1 3.1L8.6 8l3.1-3.1zm-5.4 9.8C5.1 16.8 4 18.3 4 20c0 1.1.9 2 2 2 1.7 0 3.2-1.1 3.8-2.6L7.3 16.7z"/></svg>
          </div>
          <p class="feature-label">Filtri e condivisione su WhatsApp</p>
        </li>
      </ul>
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

/* ── CTA section ────────────────────────────────────────────────────────── */
.cta-section {
  background-color: var(--wedding-surface);
  padding: 1.5rem 1.5rem 4.5rem;
}

.cta-inner {
  max-width: 36rem;
  margin: 0 auto;
}

.cta-card {
  background: var(--wedding-white);
  border: 1px solid var(--wedding-border);
  border-radius: 0.875rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  box-shadow: 0 4px 24px rgba(133, 153, 197, 0.12);
}

.cta-icon {
  width: 3rem;
  height: 3rem;
  color: var(--wedding-brand);
  flex-shrink: 0;
}

.cta-icon svg {
  width: 100%;
  height: 100%;
}

.cta-title {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-ink);
}

.cta-desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
  max-width: 30rem;
}

.cta-desc strong {
  color: var(--wedding-ink);
  font-weight: 600;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.8rem 2rem;
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.cta-btn:hover {
  background-color: var(--wedding-brand-dark);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.cta-note {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--wedding-ink-faint);
  font-style: italic;
  margin-top: 0.25rem;
}

/* ── How it works ───────────────────────────────────────────────────────── */
.how-section {
  background-color: var(--wedding-surface-alt);
  padding: 4.5rem 1.5rem;
}

.how-inner {
  max-width: 44rem;
  margin: 0 auto;
}

.how-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-brand-dark);
  margin-bottom: 2.5rem;
  text-align: center;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.125rem;
}

.step-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-title {
  font-family: var(--font-heading);
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--wedding-ink);
}

.step-desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
}

/* ── App store badges ───────────────────────────────────────────────────── */
.store-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.store-badge {
  display: block;
  width: 130px;
  border-radius: 6px;
  overflow: hidden;
  transition: opacity 0.2s;
}

.store-badge:hover {
  opacity: 0.85;
}

.store-badge svg {
  display: block;
  width: 100%;
  height: auto;
}

/* ── Features grid ──────────────────────────────────────────────────────── */
.features-section {
  background-color: var(--wedding-surface);
  padding: 4.5rem 1.5rem;
}

.features-inner {
  max-width: 56rem;
  margin: 0 auto;
}

.features-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-brand-dark);
  margin-bottom: 2.5rem;
  text-align: center;
}

.features-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  background: var(--wedding-brand-pale);
  border: 1px solid var(--wedding-border-soft);
  border-radius: 0.75rem;
  padding: 1.125rem 1.25rem;
}

.feature-icon {
  flex-shrink: 0;
  width: 1.375rem;
  height: 1.375rem;
  color: var(--wedding-brand);
  margin-top: 0.0625rem;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-label {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--wedding-ink);
}
</style>
