import '@/assets/styles/scaffolding.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';

import router from '@/router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';

const app = createApp(App);

app.use(router);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
app.mount('#app');

