<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import illustrationUrl from "@/assets/images/illustration-martaegiacomo.png";
import namesUrl from "@/assets/images/names-calligraphy.png";
import dateUrl from "@/assets/images/date-calligraphy.png";

onMounted(() => document.documentElement.classList.add("page-home"));
onUnmounted(() => document.documentElement.classList.remove("page-home"));
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

</template>

<style scoped>
/* ── Nav height token (must match AppNav .nav-inner height: 3.75rem) ──── */
:root {
  --nav-h: 3.75rem;
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  height: 100dvh;
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
  gap: 3rem;
  padding: calc(var(--nav-h) + 2.5rem) 2rem 3rem;
  margin: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.hero-names {
  width: min(24vw, 14rem);
  height: auto;
  filter: brightness(0) invert(1);
  user-select: none;
}

.hero-illustration {
  width: 80%;
  flex: 1 1 0;
  min-height: 10dvh;
  max-height: 45dvh;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(40, 50, 90, 0.18));
  user-select: none;
}

.hero-date {
  width: min(18vw, 8rem);
  height: auto;
  filter: brightness(0) invert(1);
  opacity: 0.95;
  user-select: none;
}

.hero-tagline {
  font-family: var(--font-heading);
  font-size: clamp(0.75rem, 1.8vw, 1rem);
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--wedding-white);
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .hero-content {
    gap: 1.25rem;
  }

  .hero-names {
    width: min(70vw, 14rem);
  }

  .hero-illustration {
    max-height: 30dvh;
    width: 90%;
  }

  .hero-date {
    width: min(45vw, 8rem);
  }
}
</style>
