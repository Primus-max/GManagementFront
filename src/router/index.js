import ArchivePage from 'src/components/pages/ArchivePage.vue';
import AuthorizationPage from 'src/components/pages/AuthorizationPage.vue';
import ClientsPage from 'src/components/pages/ClientsPage.vue';
import GirlsPage from 'src/components/pages/GirlsPage.vue';
import MainPage from 'src/components/pages/MainPage.vue';
import OperatorCabinetPage from 'src/components/pages/OperatorCabinetPage.vue';
import OperatorsPage from 'src/components/pages/OperatorsPage.vue';
import { userAuth } from 'src/stores/userAuthStore.js';
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/operator",
    name: "operator",
    component: OperatorCabinetPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/authorization",
    name: "authorization",
    component: AuthorizationPage,
  },
  {
    path: "/archive",
    name: "archive",
    component: ArchivePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/girls",
    name: "girls",
    component: GirlsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/operators",
    name: "operators",
    component: OperatorsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Глобальный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  
  const token = localStorage.getItem("token");
  const authStore = userAuth();
  authStore.isAuthenticated = !!token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: "authorization" });
    } else {
      next();
    }
  } else {
    if (to.name === "authorization" && authStore.isAuthenticated) {
      router.push({ name: "main" });
    } else {
      next();
    }
  }
});

export default router;
