import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import ArchivePage from '@/components/pages/ArchivePage.vue';
import AuthorizationPage from '@/components/pages/AuthorizationPage.vue';
import GirlsPage from '@/components/pages/GirlsPage.vue';
import MainPage from '@/components/pages/MainPage.vue';
import OperatorCabinetPage from '@/components/pages/OperatorCabinetPage.vue';
import OperatorsPage from '@/components/pages/OperatorsPage.vue';
import { userAuth } from '@/stores/userAuth';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta: { requiresAuth: true }
  },
{
  path: '/operator',
  name: 'operator',
  component: OperatorCabinetPage,
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
    path: '/girls',
    name: 'girls',
    component: GirlsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/operators',
    name: 'operators',
    component: OperatorsPage,
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
