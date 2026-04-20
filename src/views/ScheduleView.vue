<script setup lang="ts">
import LaceDivider from "@/components/LaceDivider.vue";
import WeddingTimeline from "@/components/WeddingTimeline.vue";
import type { TimelineEvent } from "@/components/WeddingTimeline.vue";

const events: TimelineEvent[] = [
  {
    time: "11:00",
    title: "Cerimonia",
    description:
      "Vi aspettiamo a Ganci Farm per celebrare insieme il momento più emozionante della giornata. La cerimonia si terrà all'aperto, immersa nel verde delle colline liguri.",
    icon: "rings",
  },
  {
    time: "12:00",
    title: "Sessione fotografica",
    description:
      "Subito dopo la cerimonia ci ritaglieremo un po' di tempo per le foto di gruppo e i ritratti. Sarà l'occasione perfetta per immortalare sorrisi e abbracci.",
    icon: "camera",
  },
  {
    time: "13:30",
    title: "Pranzo",
    description:
      "A tavola! Ci accomoderemo per un lungo e gioioso pranzo in compagnia, con i sapori della cucina ligure e qualche sorpresa culinaria che vi auguriamo di gustare fino all'ultimo boccone.",
    icon: "fork",
  },
  {
    time: "18:00",
    title: "Aperitivo & Cocktail bar",
    description:
      "Il pomeriggio scivola verso la sera: ci sposteremo nell'area esterna per l'aperitivo, tra calici, stuzzichini e le prime luci del tramonto sul mare.",
    icon: "cocktail",
  },
  {
    time: "20:00",
    title: "Musica e ballo",
    description:
      "Si apre la pista! La serata continua con musica dal vivo e tanta voglia di ballare. Preparate le scarpe giuste — sarà una notte lunga.",
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
      <p class="page-subtitle">29 Agosto 2026 · Ganci Farm</p>
    </div>

    <div class="page-header-scallop" aria-hidden="true">
      <LaceDivider :flip="true" color="var(--wedding-surface)" />
    </div>
  </section>

  <!-- ─── Note ─────────────────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface-alt)" />

  <section class="note-section">
    <div class="note-inner">
      <p class="note-text">
        Gli orari indicati sono orientativi e potrebbero subire piccole variazioni.
        L'importante è che siate lì con noi. ♡
      </p>
    </div>
  </section>

  <LaceDivider color="var(--wedding-surface)" />

  <!-- ─── Timeline ──────────────────────────────────────────────────────── -->
  <section class="timeline-section">
    <div class="timeline-inner">
      <WeddingTimeline :events="events" />
    </div>
  </section>

  <!-- ─── Closing scallop ───────────────────────────────────────────────── -->
  <LaceDivider color="var(--wedding-surface-alt)" />
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
  font-weight: 400;
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

.page-header-scallop {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
}

/* ── Note section ────────────────────────────────────────────────────────── */
.note-section {
  background-color: var(--wedding-surface-alt);
  padding: 2.5rem 1.5rem;
}

.note-inner {
  max-width: var(--content-max);
  margin: 0 auto;
  text-align: center;
}

.note-text {
  font-family: var(--font-heading);
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  font-style: italic;
  color: var(--wedding-ink-muted);
  line-height: 1.7;
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
