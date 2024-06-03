<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddGirlForm from '@/components/modals/AddGirlForm.vue';
import SearchStatistics from '@/components/services/SearchStatistics.vue';
import GirlsStatistics from '@/components/tables/GirlsStatistics.vue';
import GirlsTable from '@/components/tables/GirlsTable.vue';

const activeTab = ref('girls');
const dialogVisible = ref(false);

const girls = ref([
  { id: 1, username: 'Girl1', group_id: 'Group1', balance: 100 },
  { id: 2, username: 'Girl2', group_id: 'Group2', balance: 200 }
]);

const statistics = ref([
  { id: 1, username: 'Girl1', totalOrders: 120, totalAmount: 1200 },
  { id: 2, username: 'Girl2', totalOrders: 180, totalAmount: 1800 }
]);

const handleClose = () => {
  dialogVisible.value = false;
};

const editGirl = (girl) => {
  console.log('Редактировать девушку:', girl);
};

const deleteGirl = (girl) => {
  console.log('Удалить девушку:', girl);
};
</script>

<template>
  <div class="page girls-page">
    <div class="page-wrapper">
      <el-tabs v-model="activeTab" tab-position="left" type="border-card">
        <el-tab-pane label="Девушки" name="girls">
          <div class="table-wrapper">
            <el-button type="primary" @click="dialogVisible = true">
              <i class="el-icon-plus"></i> Добавить девушку
            </el-button>
            <el-drawer v-model="dialogVisible" title="Добавить девушку" :before-close="handleClose" direction="ltr">
              <AddGirlForm @close="dialogVisible = false" />
            </el-drawer>
            <GirlsTable :girls="girls" @editGirl="editGirl" @deleteGirl="deleteGirl" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Статистика" name="statistics">
          <div class="statistics-wrapper">
            <SearchStatistics />
            <GirlsStatistics :statistics="statistics" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/main.css';

.table-wrapper {
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.statistics-wrapper {
  margin-top: 30px;
}
</style>
