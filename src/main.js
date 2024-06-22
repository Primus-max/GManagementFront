import 'src/assets/styles/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import router from 'src/router/index';
import { userAuth } from 'src/stores/userAuthStore.js';
import { checkTokenExpiration } from 'src/utils/checkUtils.js';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const userAuthStore = userAuth();
window.authStore = userAuthStore;

// const checkTokenExpiration = () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp * 1000; // Извлекаем время истечения из токена
//     const now = new Date().getTime();
//     if (tokenExpiry < now) {
//       localStorage.removeItem('token');
//       userAuthStore.logout();
//       return false;
//     }
//     return true;
//   }
//   return false;
// };

const initAuth = async () => {
  if (checkTokenExpiration(userAuthStore)) {
    const me = await userAuthStore.getMe();
    if (me) {
      userAuthStore.setUser(me);
    } else {
      localStorage.removeItem('token');
      userAuthStore.logout();
    }
  }

  app.use(router);
  app.mount('#app');
};

initAuth();
