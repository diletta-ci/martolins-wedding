<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import titRsvpImg from '@/assets/images/tit-rsvp.png'
</script>

<template>
  <!-- ─── Page header ──────────────────────────────────────────────────── -->
  <PageHeader :src="titRsvpImg" alt="RSVP" aria-label="Conferma di presenza" />

  <!-- ─── Closure message ──────────────────────────────────────────────── -->
  <section class="rsvp-closed">
    <div class="rsvp-closed-inner">
      <h2 class="closed-heading">Modulo di conferma chiuso</h2>
      <p class="closed-body">
        Grazie di cuore a tutti quelli che ci hanno già fatto sapere se ci
        saranno: le conferme di presenza sono chiuse.
      </p>
      <p class="closed-body">
        Se non sei riuscito a rispondere in tempo o per qualsiasi altra
        informazione, contattaci direttamente, saremo felici di rispondere.
      </p>
      <p class="closed-body">Ci vediamo presto!</p>
      <p class="closed-signature">Marta &amp; Giacomo</p>
    </div>
  </section>
</template>

<style scoped>
.rsvp-closed {
  padding: 5rem 1.5rem;
  display: flex;
  justify-content: center;
  background-color: var(--wedding-surface);
}

.rsvp-closed-inner {
  max-width: 480px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.closed-heading {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-brand-dark);
}

.closed-body {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--wedding-ink);
}

.closed-signature {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--wedding-brand);
  line-height: 1.1;
  margin-top: 0.5rem;
}
</style>
