import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
});

export default router;
