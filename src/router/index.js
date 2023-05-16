import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import sourceData from '@/data.json'

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
    beforeEnter(to, from) {
      const exists = sourceData.destinations.find(
        destination => destination.slug === to.params.slug
      )
      if(!exists) return {
        name: 'NotFound',
        params: { pathMatch: to.path.split('/').slice(1)},
        query: to.query,
        hash: to.hash,
      }
    },
    children: [{
      path: ':experienceSlug',
      name: 'experience.show',
      component: () => import('@/views/ExperienceShow.vue'),
      props: route => ({...route.params})
    }]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
} 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
