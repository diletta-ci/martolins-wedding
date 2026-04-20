<script setup lang="ts">
interface Props {
  /** Flip vertically so the scallops point downward */
  flip?: boolean;
  /** Tailwind / CSS color for the lace fill — defaults to current brand-pale */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  flip: false,
  color: "var(--wedding-brand-pale)",
});
</script>

<template>
  <!--
    A repeating scallop/lace pattern inspired by the invitation border.
    The SVG viewBox is 120×24 with 6 half-circle arches.
    Using preserveAspectRatio="none" lets it stretch full-width at any
    container size while keeping the 24px height fixed.
  -->
  <div
    class="lace-divider"
    :class="{ 'lace-divider--flip': props.flip }"
    aria-hidden="true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 24"
      preserveAspectRatio="none"
      class="lace-svg"
    >
      <!-- Six arched scallops across the full width -->
      <path
        d="
          M0,0
          Q10,24 20,0
          Q30,24 40,0
          Q50,24 60,0
          Q70,24 80,0
          Q90,24 100,0
          Q110,24 120,0
          L120,0 L0,0 Z
        "
        :fill="props.color"
      />
    </svg>
  </div>
</template>

<style scoped>
.lace-divider {
  width: 100%;
  line-height: 0; /* collapse inline svg gap */
  overflow: hidden;
}

.lace-svg {
  width: 100%;
  height: 1.5rem; /* 24px — matches viewBox height */
  display: block;
}

.lace-divider--flip .lace-svg {
  transform: scaleY(-1);
}
</style>
