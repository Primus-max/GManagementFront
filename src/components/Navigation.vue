
<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('main');

const handleTabClick = (tab) => {
  router.push(`/${tab.name}`);
};
</script>


<template>
  <div >
    <nav >

      <RouterLink class="routs" to="/">        
        <p  class="text">Главная</p>
      </RouterLink>
<!-- 
      <RouterLink class="routs" to="/logs">
        <el-icon class="icon" :size="iconSize">
          <PieChart />
        </el-icon>
        <p v-if="!isMobile" class="text">Логи</p>
      </RouterLink>

      <RouterLink class="routs" to="/strategies">
        <el-icon class="icon" :size="iconSize">
          <TrendCharts />
        </el-icon>
        <p v-if="!isMobile" class="text">Стратегии</p>
      </RouterLink>

      <RouterLink class="routs" to="/history">
        <el-icon class="icon" :size="iconSize">
          <Calendar />
        </el-icon>
        <p v-if="!isMobile" class="text">История</p>
      </RouterLink>

      <RouterLink class="routs" to="/settings">
        <el-icon class="icon" :size="iconSize">
          <Setting />
        </el-icon>
        <p v-if="!isMobile" class="text">Настройки</p>
      </RouterLink> -->

    </nav>
  </div>
</template>

<style>

</style>