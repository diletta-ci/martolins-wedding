<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import bouquetIcon from "@/assets/images/bouquet.png";
import pranzoIcon from "@/assets/images/pranzo.png";
</script>

<template>
  <section class="not-found">
    <div class="not-found-inner">
      <h1 class="not-found-title">Ooops, questa pagina non esiste!</h1>

      <p class="not-found-body">
        Questa pagina non esiste, ma il matrimonio sì.<br />
        Il 29 agosto sai dove trovarci.
      </p>

      <div class="not-found-actions">
        <BaseButton variant="ghost" to="/">
          <img :src="bouquetIcon" alt="" class="btn-icon" />
          Torna alla festa
        </BaseButton>
        <BaseButton variant="ghost" to="/rsvp">
          <img :src="pranzoIcon" alt="" class="btn-icon" />
          Conferma la tua presenza
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - 3.75rem);
  background-color: var(--wedding-brand);
  background-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
}

.not-found-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 480px;
}

.not-found-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--wedding-white);
}

.not-found-body {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.85);
}

.not-found-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
}


.btn-icon {
  width: 1.75rem;
  height: 1.75rem;
  object-fit: contain;
}

@media (max-width: 480px) {
  .not-found-actions {
    grid-template-columns: 1fr;
  }
}
</style>
