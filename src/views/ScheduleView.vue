<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import WeddingTimeline from "@/components/WeddingTimeline.vue";
import type { TimelineEvent } from "@/components/WeddingTimeline.vue";
import bouquetIcon from "@/assets/images/bouquet.png";
import pranzoIcon from "@/assets/images/pranzo.png";
import tortaIcon from "@/assets/images/torta.png";

const events: TimelineEvent[] = [
  {
    time: "11:30",
    title: "Cerimonia civile",
    description: "Masseria Ganci – Via Ganci, 20 – 17015 Celle Ligure",
    iconImage: bouquetIcon,
  },
  {
    time: "13:30",
    title: "Ricevimento",
    description:
      "Ganci Farm — Via Ganci, 15 — 17015 Celle Ligure.",
    iconImage: pranzoIcon,
  },
  {
    title: "Festeggiamenti",
    description:
      "Seguiranno torta e musica!\nPer tutto il ricevimento sarà disponibile un servizio di baby-sitting.",

    iconImage: tortaIcon,
  },
];
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <PageHeader src="/tit-programma.png" alt="Programma" aria-label="Programma della giornata" />

  <!-- ─── Timeline ──────────────────────────────────────────────────────── -->
  <section class="timeline-section">
    <div class="timeline-inner">
      <WeddingTimeline :events="events" />
    </div>
  </section>
</template>

<style scoped>
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
