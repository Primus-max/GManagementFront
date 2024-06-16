<script setup>
import { ref } from 'vue';

import { RouterLink } from 'vue-router';

const activeIndex = ref('1');
// const activePage = ref('Главная');
</script>

<template>
  <div class="menu-wrapper">
    <!-- <p class="active-page">{{ activePage }}</p> -->
    <!-- @select="handleSelect" -->
  <div class="nav-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"      
    >
      <el-menu-item index="1">
        <RouterLink to="/">
          <p class="route-text">Главная</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="3">
        <RouterLink to="/archive">
          <p class="route-text">Архив</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="4">
        <RouterLink to="/operators">
          <p class="route-text">Операторы</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="5">
        <RouterLink to="/girls">
          <p class="route-text">Девушки</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="6">
        <RouterLink to="/clients">
          <p class="route-text">Клиенты</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="7">
        <RouterLink to="/operator">
          <p class="route-text">Кабинет</p>
        </RouterLink>
      </el-menu-item>
    </el-menu>
  </div>
</div>
</template>


<style lang="css" scoped>
@import 'src/assets/styles/main.css';

.menu-wrapper{
  width: 100%;
  display: flex;
  flex-direction: row;  
  justify-content: right;
}

.nav-wrapper {
  height: 100%;
  width: 90%;  
  display: flex;
  flex-direction: row;  
  justify-content: center;  
}

 .el-menu {
  display: flex;
  flex-direction: row;

  justify-content: right;
  height: 60px;
  width: 60%;
  
  padding: 0;
  
}

.route-text{
  margin: 0;
  padding: 0 20px 0 20px; 
  font-size: 16px;  
}

</style>
