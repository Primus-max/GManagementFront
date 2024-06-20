<script setup>
import {
  computed,
  inject,
  watch,
} from 'vue';

import MainLayout from 'src/components/layouts/MainLayout.vue';
import AuthorizationPage from 'src/components/pages/AuthorizationPage.vue';

// import { userAuth } from 'src/stores/userAuthStore.js';

const authStore = window.authStore;
const isAuthenticated = computed(() => {
  console.log(authStore)
  return authStore.isAuthenticated
});

watch(isAuthenticated, (newVal) => {
  if (!newVal) {
    authStore.getMe().then((me) => {
      if (me) {
        authStore.setUser(me);
      }
    });
  }
});
</script>

<template>
  <AuthorizationPage v-if="!isAuthenticated" />
  <MainLayout v-else />
</template>

<style scoped></style>
