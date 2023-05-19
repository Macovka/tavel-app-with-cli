import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import sourceData from '@/data.json'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    alias: "/home",
  },
  {
    path: "/home",
    redirect: '/',
  },
  {
    path: '/protected',
    name: 'protected',
    components: {
      default: () => import('@/views/Protected.vue'),
      LeftSidebar: () => import('@/components/LeftSidebar.vue'),
    },
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
    components: {
      default: () => import('@/views/Invoices.vue'),
      LeftSidebar: () => import('@/components/LeftSidebar.vue'),
    },
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
      if(!isDestinationExists(to.params.slug)) {
        return redirectToNotFound(to);
      }
    },
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/ExperienceShow.vue'),
        props: route => ({...route.params}),
        beforeEnter(to, from) {
          if(!isExperienceExists(to.params.slug, to.params.experienceSlug)) {
            return redirectToNotFound(to);
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

function isDestinationExists(destinationSlug) {
  const exists = sourceData.destinations.find(
    destination => destination.slug === destinationSlug
  );
  return exists;
}

function isExperienceExists(destinationSlug, experienceSlug) {
  const destination = isDestinationExists(destinationSlug);
  const experienceExists = destination.experiences.find(
    (experience) => experience.slug === experienceSlug
  );
  return experienceExists;
}

function redirectToNotFound(to) {
  return {
    name: 'NotFound',
    params: { pathMatch: to.path.split('/').slice(1) },
    query: to.query,
    hash: to.hash,
  };
}