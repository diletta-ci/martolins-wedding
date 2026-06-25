<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <PageHeader src="/tit-foto.png" alt="Foto" aria-label="Album fotografico" />

  <!-- ─── Intro ────────────────────────────────────────────────────────── -->
  <section class="intro-section">
    <div class="intro-inner">
      <p class="intro-text">
        Qui trovi un modo semplice per condividere con noi tutte le foto e i video che hai fatto
        durante l'evento. Puoi aprire l'album
        <a href="https://drive.google.com/drive/folders/1xBdXuXFddrbAgJ3cLotUmSw14D0wCXz7" target="_blank" rel="noopener noreferrer" class="intro-link">direttamente da qui</a>
        oppure usando il pulsante qui sotto — carica i tuoi scatti e sarà il nostro modo di rivivere questa giornata insieme.
      </p>
    </div>
  </section>

  <!-- ─── Strips + CTA ─────────────────────────────────────────────────── -->
  <section class="album-content" aria-label="Accedi all'album">
    <div class="album-content-inner">

      <!-- Strisce fotografiche -->
      <div class="strips-col">
        <div class="strip-wrap strip-wrap--left">
          <div class="tape"></div>
          <img
            class="strip-img"
            src="/mg-fototess1.png"
            alt="Striscia fotografica di Marta e Giacomo"
          >
        </div>
        <div class="strip-wrap strip-wrap--right">
          <div class="tape"></div>
          <img
            class="strip-img"
            src="/mg-fototess2.png"
            alt="Striscia fotografica di Marta e Giacomo"
          >
        </div>
      </div>

      <!-- CTA card -->
      <div class="cta-card">
        <div class="cta-icon" aria-hidden="true">
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

.intro-link {
  color: var(--wedding-brand-dark);
  text-decoration: underline;
}

/* ── Strips + CTA ───────────────────────────────────────────────────────── */
.album-content {
  background-color: var(--wedding-surface);
  padding: 1.5rem 2rem 4.5rem;
}

.album-content-inner {
  max-width: 58rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

@media (max-width: 640px) {
  .album-content-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* ── Strips column ──────────────────────────────────────────────────────── */
.strips-col {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  padding: 1.5rem 0;
}

.strip-wrap {
  position: relative;
  transition: transform 0.3s ease;
}

.strip-wrap--left  { transform: rotate(-5deg) translateY(8px); }
.strip-wrap--right { transform: rotate(4.5deg) translateY(4px); }

.strip-wrap:hover {
  transform: rotate(0deg) translateY(0) scale(1.04);
  z-index: 1;
}

.strip-img {
  width: 120px;
  border-radius: 2px;
  display: block;
  box-shadow:
    3px 4px 0 rgba(28, 27, 24, 0.05),
    6px 8px 24px rgba(28, 27, 24, 0.16);
}

.tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 36px;
  height: 14px;
  background: rgba(196, 208, 232, 0.6);
  border-radius: 2px;
  z-index: 1;
}

.strip-wrap--right .tape {
  transform: translateX(-50%) rotate(2deg);
}

/* ── CTA card ───────────────────────────────────────────────────────────── */
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
