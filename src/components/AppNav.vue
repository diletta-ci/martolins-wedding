<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const menuOpen = ref(false);

const links = [
  { to: "/", label: "Home", name: "home" },
  { to: "/location", label: "Location", name: "location" },
  { to: "/schedule", label: "Programma", name: "schedule" },
  { to: "/registry", label: "Lista Nozze", name: "registry" },
  { to: "/rsvp", label: "RSVP", name: "rsvp" },
] as const;

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <header class="app-nav">
    <div class="nav-inner">
      <!-- Wordmark -->
      <RouterLink to="/" class="nav-wordmark" @click="closeMenu">
        M &amp; G
      </RouterLink>

      <!-- Desktop links -->
      <nav class="nav-links" aria-label="Navigazione principale">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="nav-link"
          active-class="nav-link--active"
          exact-active-class="nav-link--exact"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="nav-hamburger"
        :aria-expanded="menuOpen"
        aria-label="Apri menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="hamburger-bar" :class="{ open: menuOpen }" />
        <span class="hamburger-bar" :class="{ open: menuOpen }" />
        <span class="hamburger-bar" :class="{ open: menuOpen }" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <nav
      v-show="menuOpen"
      class="nav-drawer"
      aria-label="Menu mobile"
    >
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.to"
        class="drawer-link"
        active-class="drawer-link--active"
        @click="closeMenu"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
/* ── Shell ─────────────────────────────────────────────────────────────── */
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--wedding-white);
  border-bottom: 1px solid var(--wedding-border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--content-wide);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 3.75rem;
}

/* ── Wordmark ───────────────────────────────────────────────────────────── */
.nav-wordmark {
  font-family: var(--font-display);
  font-size: 1.75rem;
  color: var(--wedding-brand);
  line-height: 1;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}

.nav-wordmark:hover {
  color: var(--wedding-brand-dark);
}

/* ── Desktop links ──────────────────────────────────────────────────────── */
.nav-links {
  display: none;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 640px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wedding-ink-muted);
  transition: color 0.2s;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
}

.nav-link:hover,
.nav-link--active {
  color: var(--wedding-brand);
}

.nav-link--exact {
  color: var(--wedding-brand);
  border-bottom-color: var(--wedding-brand);
}

/* ── Hamburger ──────────────────────────────────────────────────────────── */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

@media (min-width: 640px) {
  .nav-hamburger {
    display: none;
  }
}

.hamburger-bar {
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: var(--wedding-ink);
  border-radius: 1px;
  transition: transform 0.2s, opacity 0.2s;
}

.hamburger-bar.open:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}

.hamburger-bar.open:nth-child(2) {
  opacity: 0;
}

.hamburger-bar.open:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* ── Mobile drawer ──────────────────────────────────────────────────────── */
.nav-drawer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--wedding-border);
  padding: 0.75rem 0;
}

@media (min-width: 640px) {
  .nav-drawer {
    display: none !important;
  }
}

.drawer-link {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--wedding-ink-muted);
  padding: 0.75rem 1.5rem;
  transition: color 0.2s, background-color 0.2s;
}

.drawer-link:hover,
.drawer-link--active {
  color: var(--wedding-brand);
  background-color: var(--wedding-brand-pale);
}
</style>
