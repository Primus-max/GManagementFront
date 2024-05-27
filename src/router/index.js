import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import MainPage from '@/components/pages/MainPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'main',
        component: MainPage
      },
      {
        path: '/authorization',
        name: 'authorization',     
        component: () => import('../components/pages/AuthorizationPage.vue')
      },
      {
        path: '/archive',
        name: 'archive',     
        component: () => import('../components/pages/ArchivePage.vue')
      },
      {
        path: '/statisticsOnGirls',
        name: 'statisticsOnGirls',     
        component: () => import('../components/pages/StatisticsOnGirlsPage.vue')
      }, 
      {
        path: '/statisticsOnOperators',
        name: 'statisticsOnOperators',     
        component: () => import('../components/pages/StatisticsOnOperatorsPage.vue')
      }
    ]
  })
  

export default router;
