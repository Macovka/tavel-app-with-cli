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
    path: '/protected',
    name: 'protected',
    component: () => import('@/views/Protected.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: () => import('@/views/Invoices.vue'),
    meta: {
      requiresAuth: true,
    }
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
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route => ({...route.params}),
        beforeEnter(to, from) {
          const exists = sourceData.destinations.find(
            destination => destination.slug === to.params.slug
          );
          const experienceExists = exists.experiences.some(
            (experience) => experience.slug === to.params.experienceSlug
          );
          if(!experienceExists) return {
            name: 'NotFound',
            params: { pathMatch: to.path.split('/').slice(1)},
            query: to.query,
            hash: to.hash,
          } 
        },
      },
    ]
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
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'experience.show') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: '#experience-show', behavior: 'smooth' });
        }, 300);
      });
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ top: 0, behavior: 'smooth' });
        }, 300);
      });
    }
  }
});

router.beforeEach((to, from) => {
  if(to.meta.requiresAuth && !window.user) {
    //need to login if not already logged in
    return {name: 'login', query: {redirect: to.fullPath}}
  }
})

export default router;
