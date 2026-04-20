<script setup lang="ts">
export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon?: "rings" | "camera" | "fork" | "cocktail" | "music";
}

defineProps<{
  events: TimelineEvent[];
}>();
</script>

<template>
  <ol class="timeline" aria-label="Programma della giornata">
    <li
      v-for="(event, index) in events"
      :key="index"
      class="timeline-item"
    >
      <!-- Connector line + dot -->
      <div class="timeline-rail" aria-hidden="true">
        <div class="timeline-dot">
          <!-- rings -->
          <svg v-if="event.icon === 'rings'" viewBox="0 0 24 24" fill="none" class="timeline-icon">
            <path d="M7 8a4 4 0 1 0 0 8A4 4 0 0 0 7 8zm10 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM11 12a4.002 4.002 0 0 0 2 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <!-- camera -->
          <svg v-else-if="event.icon === 'camera'" viewBox="0 0 24 24" fill="none" class="timeline-icon">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <!-- fork/knife -->
          <svg v-else-if="event.icon === 'fork'" viewBox="0 0 24 24" fill="none" class="timeline-icon">
            <path d="M3 2v7c0 1.1.9 2 2 2h2v11h2V11h2a2 2 0 0 0 2-2V2h-2v6H7V2H5v6H3V2zM19 2h-1c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2v8h2V2z" fill="currentColor"/>
          </svg>
          <!-- cocktail -->
          <svg v-else-if="event.icon === 'cocktail'" viewBox="0 0 24 24" fill="none" class="timeline-icon">
            <path d="M3 3h18l-9 9m0 0v9m0-9L3 3m9 12H7m5 0h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- music -->
          <svg v-else-if="event.icon === 'music'" viewBox="0 0 24 24" fill="none" class="timeline-icon">
            <path d="M9 18V5l12-2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="18" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <!-- default star -->
          <svg v-else viewBox="0 0 24 24" fill="currentColor" class="timeline-icon">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
          </svg>
        </div>
        <div v-if="index < events.length - 1" class="timeline-line" />
      </div>

      <!-- Content -->
      <div class="timeline-content">
        <time class="timeline-time">{{ event.time }}</time>
        <h3 class="timeline-title">{{ event.title }}</h3>
        <p class="timeline-description">{{ event.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0 1.75rem;
}

/* ── Rail (dot + vertical line) ──────────────────────────────────────────── */
.timeline-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--wedding-brand-pale);
  border: 1.5px solid var(--wedding-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wedding-brand);
  position: relative;
  z-index: 1;
  transition: background-color 0.2s, border-color 0.2s;
}

.timeline-item:hover .timeline-dot {
  background-color: var(--wedding-brand-light);
  border-color: var(--wedding-brand);
}

.timeline-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.timeline-line {
  flex: 1;
  width: 1.5px;
  background: var(--wedding-border-soft);
  margin: 0.25rem 0;
  min-height: 2rem;
}

/* ── Content ─────────────────────────────────────────────────────────────── */
.timeline-content {
  padding-bottom: 2.75rem;
  padding-top: 0.375rem; /* vertically centre with dot */
}

.timeline-item:last-child .timeline-content {
  padding-bottom: 0;
}

.timeline-time {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--wedding-brand);
  margin-bottom: 0.35rem;
}

.timeline-title {
  font-family: var(--font-heading);
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 400;
  color: var(--wedding-ink);
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.timeline-description {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.75;
  color: var(--wedding-ink-muted);
  max-width: 52ch;
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .timeline-item {
    grid-template-columns: 2.5rem 1fr;
    gap: 0 1.25rem;
  }

  .timeline-dot {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
