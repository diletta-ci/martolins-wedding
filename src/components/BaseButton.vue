<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(defineProps<{
  variant?: 'solid' | 'ghost'
  href?: string
  to?: string
}>(), {
  variant: 'solid',
})

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const tagAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    class="base-btn"
    :class="`base-btn--${variant}`"
    v-bind="tagAttrs"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.base-btn--solid {
  background-color: var(--wedding-brand);
  color: var(--wedding-white);
}

.base-btn--solid:hover {
  background-color: var(--wedding-brand-dark);
}

.base-btn--ghost {
  background-color: var(--wedding-white);
  color: var(--wedding-brand-dark);
}

.base-btn--ghost:hover {
  background-color: var(--wedding-brand-pale);
}
</style>
