import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import HelloWorld from '@/components/pages/HelloWorld.vue';

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
];
const router = createRouter({ history: createWebHistory(), routes });

export default router
