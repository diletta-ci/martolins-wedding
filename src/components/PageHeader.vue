<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <section class="page-header">
    <img :src="src" :alt="alt" class="page-title-img" />
  </section>
</template>

<style scoped>
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
  height: clamp(3rem, 12.5vw, 9.5rem);
  width: auto;
  max-width: 100%;
}
</style>
