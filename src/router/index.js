import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import ArchivePage from '@/components/pages/ArchivePage.vue';
import AuthorizationPage from '@/components/pages/AuthorizationPage.vue';
import MainPage from '@/components/pages/MainPage.vue';
import StatisticsOnGirlsPage
  from '@/components/pages/StatisticsOnGirlsPage.vue';
import StatisticsOnOperatorsPage
  from '@/components/pages/StatisticsOnOperatorsPage.vue';
import { userAuth } from '@/stores/userAuth';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: AuthorizationPage
  },
  {
    path: '/archive',
    name: 'archive',
    component: ArchivePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/statisticsOnGirls',
    name: 'statisticsOnGirls',
    component: StatisticsOnGirlsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/statisticsOnOperators',
    name: 'statisticsOnOperators',
    component: StatisticsOnOperatorsPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Глобальный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const authStore = userAuth();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'authorization' });
  } else {
    next();
  }
});

export default router;
