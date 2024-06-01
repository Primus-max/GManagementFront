<script setup>
import { computed } from 'vue';

import Navigation from '@/components/Navigation.vue';
import AuthorizationPage from '@/components/pages/AuthorizationPage.vue';
import router from '@/router/index.js';
import { userAuth } from '@/stores/userAuth.js';

const authStore = userAuth();
const isAuthenticated = computed(() => authStore.isAuthenticated);

if (!isAuthenticated.value) {
    router.push({ name: 'authorization' });
}
</script>

<template>
  <div class="common-layout">
    <el-container v-if="isAuthenticated">
      <el-header class="header">
        <Navigation />
      </el-header>
      <el-main class="main">
        <router-view /> <!-- Вставляем компоненты маршрутов -->
      </el-main>
    </el-container>
    <AuthorizationPage v-else /> <!-- Только страница авторизации, если не авторизован -->
  </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/scaffolding.css';

.common-layout {
  height: 100vh;
  display: flex;
  padding:0px 0px 0px 20px;
}

.header {
  display:  flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: right;
  height: 60px;
  width: 100%;
  padding: 0;
  
}

.main {
  width: 100%;
  flex-grow: 1;
  padding: 20px;
}
</style>