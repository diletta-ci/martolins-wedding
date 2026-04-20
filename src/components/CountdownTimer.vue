<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const WEDDING_DATE = new Date("2026-08-29T11:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const timeLeft = ref<TimeLeft>(calcTimeLeft());
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    timeLeft.value = calcTimeLeft();
  }, 1000);
});

onUnmounted(() => {
  if (timer !== null) clearInterval(timer);
});

const units = computed(() => [
  { value: timeLeft.value.days,    label: "Giorni" },
  { value: timeLeft.value.hours,   label: "Ore" },
  { value: timeLeft.value.minutes, label: "Minuti" },
  { value: timeLeft.value.seconds, label: "Secondi" },
]);

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <div class="countdown" role="timer" aria-label="Conto alla rovescia per il matrimonio">
    <div
      v-for="unit in units"
      :key="unit.label"
      class="countdown-unit"
    >
      <span class="countdown-value">{{ pad(unit.value) }}</span>
      <span class="countdown-label">{{ unit.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-width: 4.5rem;
}

.countdown-value {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 300;
  color: var(--wedding-brand);
  line-height: 1;
  letter-spacing: 0.04em;
  /* subtle entrance animation */
  transition: opacity 0.2s;
}

.countdown-label {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--wedding-ink-muted);
}

/* Separator dots between units (except after last) */
.countdown-unit:not(:last-child)::after {
  content: "·";
  position: absolute;
  /* implemented via gap — no absolute positioning needed */
}

@media (max-width: 480px) {
  .countdown {
    gap: 1rem;
  }
  .countdown-unit {
    min-width: 3.5rem;
  }
}
</style>
