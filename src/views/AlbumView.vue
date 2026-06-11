<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Album fotografico">
    <div class="page-header-inner">
      <p class="page-eyebrow">I vostri ricordi</p>
      <h1 class="page-title">Foto &amp; Video</h1>
      <p class="page-subtitle">29 · 8 · 2026</p>
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
          Le foto sono su <strong>Google Drive</strong>. Puoi sfogliare l'album e caricare
          i tuoi scatti direttamente dal browser, senza installare nulla.
        </p>
        <a
          href="https://drive.google.com/drive/folders/1xBdXuXFddrbAgJ3cLotUmSw14D0wCXz7"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn"
          aria-label="Apri l'album su Google Drive"
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
  box-shadow: 0 4px 24px rgba(141, 166, 212, 0.12);
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


</style>
