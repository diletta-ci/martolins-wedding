<script setup lang="ts">
import WeddingTimeline from "@/components/WeddingTimeline.vue";
import type { TimelineEvent } from "@/components/WeddingTimeline.vue";
import bouquetIcon from "@/assets/images/bouquet.png";
import fioriIcon from "@/assets/images/fiori.png";
import tortaIcon from "@/assets/images/torta.png";

const events: TimelineEvent[] = [
  {
    time: "11:30",
    title: "Cerimonia civile",
    description: "Via Mezzalunga, 2 — 17015 Celle Ligure",
    iconImage: bouquetIcon,
  },
  {
    time: "13:30",
    title: "Ricevimento",
    description:
      "Ganci Farm — Via Ganci, 15 — 17015 Celle Ligure. Pranzo immerso nel verde delle colline liguri.",
    iconImage: fioriIcon,
  },
  {
    title: "Festeggiamenti",
    description:
      "Seguiranno torta e festeggiamenti! Si apre la pista: la giornata continua con musica e tanta voglia di ballare e stare insieme. Anche i bambini si divertiranno — sarà disponibile un servizio di baby-sitting durante tutta la durata dell'evento.",
    iconImage: tortaIcon,
  },
];
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <section class="page-header" aria-label="Programma della giornata">
    <img
      src="/tit-programma.png"
      alt="Programma"
      class="page-title-img"
    />
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
  filter: invert(1);
  mix-blend-mode: screen;
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
