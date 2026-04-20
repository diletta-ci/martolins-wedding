<script setup lang="ts">
import LaceDivider from "@/components/LaceDivider.vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
</script>

<template>
  <!-- ─── Hero ───────────────────────────────────────────────────────── -->
  <section class="hero" aria-label="Benvenuti al matrimonio di Marta e Giacomo">
    <!-- Decorative ring / monogram backdrop -->
    <div class="hero-ornament" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="ornament-svg">
        <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
        <circle cx="100" cy="100" r="75" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
        <!-- small corner florals -->
        <circle cx="100" cy="10"  r="2.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="190" cy="100" r="2.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="100" cy="190" r="2.5" fill="rgba(255,255,255,0.3)"/>
        <circle cx="10"  cy="100" r="2.5" fill="rgba(255,255,255,0.3)"/>
      </svg>
    </div>

    <div class="hero-content">
      <!-- Couple names -->
      <h1 class="hero-names">Marta &amp; Giacomo</h1>

      <!-- Date + location -->
      <p class="hero-date">29 · 8 · 2026 &nbsp;—&nbsp; Celle Ligure</p>

      <!-- Thin rule -->
      <div class="hero-rule" aria-hidden="true" />

      <!-- Venue subtitle -->
      <p class="hero-venue">Ganci Farm</p>
    </div>

    <!-- Scallop transition to white surface -->
    <div class="hero-scallop" aria-hidden="true">
      <LaceDivider :flip="true" color="var(--wedding-surface)" />
    </div>
  </section>

  <!-- ─── Countdown ──────────────────────────────────────────────────── -->
  <section class="countdown-section">
    <p class="countdown-eyebrow">Mancano</p>
    <CountdownTimer />
    <p class="countdown-sub">al giorno più bello ✦</p>
  </section>

  <!-- ─── Divider into welcome ───────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface-alt)" />

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
        Non vediamo l'ora di festeggiare insieme a voi. ♡
      </p>
      <p class="welcome-signature">Marta &amp; Giacomo</p>
    </div>
  </section>

  <!-- ─── Closing scallop ────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface)" />
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  background-color: var(--wedding-brand);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* subtle radial glow */
  background-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 70%
  );
}

.hero-ornament {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.ornament-svg {
  width: min(60vmin, 440px);
  height: auto;
  opacity: 0.9;
}

/* ── Hero content ─────────────────────────────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem 5rem; /* bottom padding clears scallop */
  text-align: center;
}

.hero-names {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 14vw, 7rem);
  font-weight: 400;
  color: var(--wedding-white);
  line-height: 1.05;
  letter-spacing: 0.01em;
  /* soft text shadow so it reads on any bg */
  text-shadow: 0 2px 24px rgba(80, 90, 130, 0.25);
}

.hero-date {
  font-family: var(--font-heading);
  font-size: clamp(0.75rem, 2.5vw, 1rem);
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.25rem;
}

.hero-rule {
  width: 3rem;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0;
}

.hero-venue {
  font-family: var(--font-heading);
  font-size: clamp(0.7rem, 2vw, 0.875rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}

/* ── Scallop at hero bottom ───────────────────────────────────────────── */
.hero-scallop {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
}

/* ── Countdown section ────────────────────────────────────────────────── */
.countdown-section {
  background-color: var(--wedding-surface);
  padding: 4rem 1.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.countdown-eyebrow {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--wedding-ink-muted);
}

.countdown-sub {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  color: var(--wedding-ink-muted);
  margin-top: 0.25rem;
  font-style: italic;
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
  font-weight: 400;
  font-style: italic;
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
  font-size: 2.25rem;
  color: var(--wedding-brand);
  line-height: 1.1;
  margin-top: 0.5rem;
}
</style>
