import 'src/assets/styles/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import router from 'src/router/index';
import { userAuth } from 'src/stores/userAuthStore.js';

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
const initAuth = async () => { 
  const token = localStorage.getItem('token');

  if (token) {
    const me = await userAuthStore.getMe();
    console.log(me);
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

