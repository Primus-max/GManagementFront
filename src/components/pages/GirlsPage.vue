<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddGirlForm from 'src/components/modals/AddGirlForm.vue';
import SearchStatistics from 'src/components/services/SearchStatistics.vue';
import GirlsStatistics from 'src/components/tables/GirlsStatistics.vue';
import GirlsTable from 'src/components/tables/GirlsTable.vue';
import { useGirlsStore } from 'src/stores/girlsStore';

const girlsStore = useGirlsStore();
const activeTab = ref('statistics');
const dialogVisible = ref(false);

onMounted(async () => {
  await girlsStore.fetchItems();
});

const girls = computed(() => girlsStore.items);
</script>

<template>
  <div class="page girls-page">
    <div class="page-wrapper">
      <el-card>
      <el-tabs v-model="activeTab" tab-position="left" >
        <el-tab-pane label="Статистика" name="statistics">
          <div class="search-header-wrapper">
            <SearchStatistics searchType="girls" :names="girls.map(girl => girl.name)" />
            </div>
            <GirlsStatistics :statistics="statistics" />
          
        </el-tab-pane>
        <el-tab-pane label="Девушки" name="girls">
          <div class="table-wrapper">
            <el-button type="primary" @click="dialogVisible = true">
              <i class="el-icon-plus"></i> Добавить девушку
            </el-button>
            <el-drawer v-model="dialogVisible" title="Добавить девушку" direction="ltr">
              <AddGirlForm @close="dialogVisible = false" :isEditing="false"/>
            </el-drawer>
            <GirlsTable :girls="girls"  />
          </div>
        </el-tab-pane>        
      </el-tabs>
    </el-card>
    </div>
  </div>
</template>

<style scoped>
@import 'src/assets/styles/main.css';
</style>
