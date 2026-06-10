<script setup lang="ts">
import WeddingTimeline from "@/components/WeddingTimeline.vue";
import type { TimelineEvent } from "@/components/WeddingTimeline.vue";

const events: TimelineEvent[] = [
  {
    time: "11:30",
    title: "Cerimonia civile",
    description: "Ganci Farm — Via Ganci, 15 — 17015 Celle Ligure",
    icon: "rings",
  },
  {
    time: "13:30",
    title: "Ricevimento",
    description:
      "Ganci Farm — Via Ganci, 15 — 17015 Celle Ligure. Pranzo immerso nel verde delle colline liguri.",
    icon: "fork",
  },
  {
    title: "Festeggiamenti",
    description:
      "Seguiranno torta e festeggiamenti! Si apre la pista: la giornata continua con musica e tanta voglia di ballare e stare insieme. Anche i bambini si divertiranno — sarà disponibile un servizio di baby-sitting durante tutta la durata dell'evento.",
    icon: "music",
  },
];
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Programma della giornata">
    <div class="page-header-inner">
      <p class="page-eyebrow">La nostra giornata</p>
      <h1 class="page-title">Programma</h1>
      <p class="page-subtitle">29 · 8 · 2026</p>
    </div>
  </section>

  <!-- ─── Timeline ──────────────────────────────────────────────────────── -->
  <section class="timeline-section">
    <div class="timeline-inner">
      <WeddingTimeline :events="events" />
    </div>
  </section>
</template>

<style scoped>
/* ── Page header ─────────────────────────────────────────────────────────── */
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

/* ── Timeline section ────────────────────────────────────────────────────── */
.timeline-section {
  background-color: var(--wedding-surface);
  padding: 4.5rem 1.5rem 5rem;
}

.timeline-inner {
  max-width: 680px;
  margin: 0 auto;
}
</style>
