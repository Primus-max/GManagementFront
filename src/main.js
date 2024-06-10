import 'src/assets/styles/main.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import router from 'src/router/index';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);
//app.config.globalProperties.$api = api;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }


app.mount('#app');

