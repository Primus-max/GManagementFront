<script setup>
import {
  computed,
  ref,
  watch,
  watchEffect,
} from 'vue';

// import { userAuth } from 'src/stores/userAuthStore';
import {
  RouterLink,
  useRoute,
  useRouter,
} from 'vue-router';

// const authStore = userAuth();
const router = useRouter();
const route = useRoute();
const whoAmI = ref('');
let activeIndex = ref('1');
watchEffect(() => {
  whoAmI.value = authStore.user.role;
  
  if (whoAmI.value === 'Admin' && route.path === '/') {
    router.push('/'); 
    activeIndex.value = '1';
  } else if (whoAmI.value === 'Operator' && route.path === '/') {
    router.push('/operator'); 
    activeIndex.value = '7';
  }
});

</script>

<template>
  <div class="menu-wrapper">  
  <div class="nav-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"      
    >
      <el-menu-item index="1" v-if="whoAmI === 'Admin' || whoAmI === 'Operator'">
        <RouterLink to="/" >
          <p class="route-text">Главная</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="3" v-if="whoAmI === 'Admin'">
        <RouterLink to="/archive">
          <p class="route-text">Архив</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="4" v-if="whoAmI === 'Admin'">
        <RouterLink to="/operators">
          <p class="route-text">Операторы</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="5" v-if="whoAmI === 'Operator' || whoAmI === 'Admin'">
        <RouterLink to="/girls">
          <p class="route-text">Девушки</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="6" v-if="whoAmI === 'Operator' || whoAmI === 'Admin'">
        <RouterLink to="/clients">
          <p class="route-text">Клиенты</p>
        </RouterLink>
      </el-menu-item>
      <el-menu-item index="7" v-if="whoAmI === 'Operator'">
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
