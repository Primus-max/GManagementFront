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
    meta: { requiresAuth: true, roles: ['Admin', 'Operator'] },
  },
  {
    path: "/operator",
    name: "operator",
    component: OperatorCabinetPage,
    meta: { requiresAuth: true, roles: [ 'Operator'] },
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
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/girls",
    name: "girls",
    component: GirlsPage,
    meta: { requiresAuth: true, roles: ['Admin', 'Operator'] },
  },
  {
    path: "/operators",
    name: "operators",
    component: OperatorsPage,
    meta: { requiresAuth: true, roles: ['Admin'] },
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsPage,
    meta: { requiresAuth: true, roles: ['Admin', 'Operator'] },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Глобальный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const authStore = userAuth();
  
  // Проверяем аутентификацию
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {      
      return next({ name: 'authorization' });
    } 
    
    // Проверяем роли
    if (to.meta.roles && !to.meta.roles.includes(authStore.user.role)) {
      if (authStore.user.role == "Operator") {
        return next({ name: 'operator' });
      }else if (authStore.user.role == "Admin") {
        return next({ name: 'main' });
      } 
    }
  }
  
  // Проверка на случай, если аутентифицированный пользователь пытается попасть на страницу авторизации
  if (to.name === 'authorization' && authStore.isAuthenticated) {
    if (authStore.user.role == "Operator") {
      return next({ name: 'operator' });
    }
    if (authStore.user.role == "Admin") {
      return next({ name: 'main' });
    }    
  }
  
  next();
});

export default router;
