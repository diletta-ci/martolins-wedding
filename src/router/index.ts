import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/location",
      name: "location",
      component: () => import("../views/LocationView.vue"),
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import("../views/ScheduleView.vue"),
    },
    {
      path: "/registry",
      name: "registry",
      component: () => import("../views/RegistryView.vue"),
    },
    {
      path: "/rsvp",
      name: "rsvp",
      component: () => import("../views/RsvpView.vue"),
    },
    {
      path: "/album",
      name: "album",
      component: () => import("../views/AlbumView.vue"),
    },
  ],
});

export default router;
