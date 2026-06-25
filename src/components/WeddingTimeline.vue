<script setup lang="ts">
export interface TimelineEvent {
  time?: string;
  title: string;
  description: string;
  iconImage?: string;
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
        <div class="timeline-dot" :class="{ 'timeline-dot--image': event.iconImage }">
          <!-- custom image -->
          <img v-if="event.iconImage" :src="event.iconImage" :alt="event.title" class="timeline-icon-img" />
          <!-- default star -->
          <svg v-else viewBox="0 0 24 24" fill="currentColor" class="timeline-icon">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
          </svg>
        </div>
        <div v-if="index < events.length - 1" class="timeline-line" />
      </div>

      <!-- Content -->
      <div class="timeline-content">
        <time v-if="event.time" class="timeline-time">{{ event.time }}</time>
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
  grid-template-columns: auto 1fr;
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

.timeline-dot--image {
  background: none;
  border-color: transparent;
  width: 6rem;
  height: 6rem;
}

.timeline-dot--image:hover,
.timeline-item:hover .timeline-dot--image {
  background: none;
  border-color: transparent;
}

.timeline-icon-img {
  width: 6rem;
  height: 6rem;
  object-fit: contain;
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
  white-space: pre-line;
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .timeline-item {
    grid-template-columns: auto 1fr;
    gap: 0 1.25rem;
  }

  .timeline-dot {
    width: 2.5rem;
    height: 2.5rem;
  }

  .timeline-dot--image {
    width: 5rem;
    height: 5rem;
  }

  .timeline-icon-img {
    width: 5rem;
    height: 5rem;
  }
}
</style>
