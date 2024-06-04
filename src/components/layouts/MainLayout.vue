<script setup>
import { computed } from 'vue';

import Navigation from '@/components/Navigation.vue';
import AuthorizationPage from '@/components/pages/AuthorizationPage.vue';
import { userAuth } from '@/stores/userAuthStore.js';

const authStore = userAuth();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<template>
  <div class="common-layout">
    <el-container v-if="isAuthenticated">
      <el-header class="header">
        <Navigation />
      </el-header>
      <el-main class="main">
        <router-view /> 
      </el-main>
    </el-container>
    <AuthorizationPage v-if="!isAuthenticated" /> 
  </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/scaffolding.css';

.common-layout {
  height: 100vh;
  display: flex;
  padding: 0 20px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: right;
  height: 60px;
  width: 100%;
  padding: 0;  
}
</style>
