
<script setup>
import HelloWorld from '../pages/HelloWorld.vue';
</script>

<template>
    <div class="common-layout">
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main
          <HelloWorld></HelloWorld>
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

</style>