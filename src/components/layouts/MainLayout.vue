<script setup>
import Navigation from 'src/components/Navigation.vue';
</script>

<template>
  <div class="common-layout">
    <el-container >
      <el-header class="header">
        <Navigation />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>    
  </div>
</template>

<style lang="css" scoped>
@import 'src/assets/styles/scaffolding.css';

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

.main {
  width: 100%;
  overflow: hidden;
}
</style>
