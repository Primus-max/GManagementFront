<script setup>
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside">
        <Navigation />
      </el-aside>
      <el-main class="main">
       <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/scaffolding.css';

.common-layout {
  height: 100vh;
  display: flex;
}

.aside {
  width: 160px;
  padding: 20px;
}

.main {
  flex-grow: 1;
  padding: 20px;
}
</style>