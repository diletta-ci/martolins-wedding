<script setup lang="ts">
import illustrationUrl from "@/assets/images/illustration-martaegiacomo.png";
import namesUrl from "@/assets/images/names-calligraphy.png";
import dateUrl from "@/assets/images/date-calligraphy.png";
</script>

<template>
  <!-- ─── Hero ───────────────────────────────────────────────────────── -->
  <section class="hero" aria-label="Benvenuti al matrimonio di Marta e Giacomo">
    <div class="hero-content">
      <img
        :src="namesUrl"
        alt="Marta e Giacomo"
        class="hero-names"
        draggable="false"
      />

      <img
        :src="illustrationUrl"
        alt="Illustrazione di Marta e Giacomo"
        class="hero-illustration"
        draggable="false"
      />

      <p class="hero-tagline">Ci sposiamo!</p>

      <img
        :src="dateUrl"
        alt="29 · 8 · 2026"
        class="hero-date"
        draggable="false"
      />
    </div>
  </section>

  <!-- ─── Welcome ───────────────────────────────────────────────────── -->
  <section class="welcome-section">
    <div class="welcome-inner">
      <h2 class="welcome-heading">Cari amici e familiari,</h2>
      <p class="welcome-body">
        Siamo felicissimi di condividere con voi il giorno del nostro matrimonio.
        Il 29 agosto 2026 ci sposeremo nella magica cornice di Ganci Farm,
        immersa nelle colline liguri di Celle Ligure.
      </p>
      <p class="welcome-body">
        In queste pagine troverete tutte le informazioni di cui avete bisogno:
        come raggiungerci, il programma della giornata, la nostra lista nozze
        e, naturalmente, il modulo per confermare la vostra partecipazione.
      </p>
      <p class="welcome-body welcome-body--signed">
        Non vediamo l'ora di festeggiare insieme a voi.
      </p>
      <p class="welcome-signature">Marta &amp; Giacomo</p>
    </div>
  </section>
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  width: 100%;
  background-color: var(--wedding-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
}

/* ── Hero content ─────────────────────────────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 0;
  margin: 0;
  text-align: center;
  width: 100%;
  height: 100svh;
  justify-content: center;
}

.hero-names {
  width: min(38vw, 24rem);
  height: auto;
  /* Tint the black calligraphy white for contrast on periwinkle */
  filter: brightness(0) invert(1);
  user-select: none;
}

.hero-illustration {
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  max-height: 80svh;
  height: auto;
  object-fit: contain;
  /* gentle drop shadow to lift off the blue */
  filter: drop-shadow(0 8px 24px rgba(40, 50, 90, 0.18));
  user-select: none;
}

.hero-date {
  width: min(28vw, 13rem);
  height: auto;
  filter: brightness(0) invert(1);
  opacity: 0.95;
  user-select: none;
}

.hero-tagline {
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 2.6vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--wedding-white);
  margin-top: 0.5rem;
}

/* ── Welcome section ──────────────────────────────────────────────────── */
.welcome-section {
  background-color: var(--wedding-surface-alt);
  padding: 4rem 1.5rem;
}

.welcome-inner {
  max-width: var(--content-max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.welcome-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--wedding-brand-dark);
  margin-bottom: 0.25rem;
}

.welcome-body {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--wedding-ink);
}

.welcome-body--signed {
  color: var(--wedding-ink-muted);
  font-style: italic;
}

.welcome-signature {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--wedding-brand);
  line-height: 1.1;
  margin-top: 0.5rem;
}
</style>
