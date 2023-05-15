import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/destination/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    props: route => ({...route.params}),
    children: [{
      path: ':experienceSlug',
      name: 'experience.show',
      component: () => import('@/views/ExperienceShow.vue'),
      props: route => ({...route.params})
  }]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;