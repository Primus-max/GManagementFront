<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';
import SearchStatistics from '@/components/services/SearchStatistics.vue';
import OperatorsStatistics from '@/components/tables/OperatorsStatistics.vue';
import OperatorsTable from '@/components/tables/OperatorsTable.vue';
import { useOperatorsStore } from '@/stores/operatorsStore';

const operatorsStore = useOperatorsStore();

const activeTab = ref('statistics');
const dialogVisible = ref(false);

onMounted(async () => {
  await operatorsStore.fetchItems();  
});

// const deleteOperator = (operatorId) => {
//   operatorsStore.deleteOperator(operatorId);
//   console.log('Удалить оператора:', operatorId);
// };

const operators = computed(() => operatorsStore.items);

</script>

<template>
  <div class="page operators-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="search-header-wrapper">
              <SearchStatistics searchType="operators" :names="operators.map(operator => operator.name)" />
            </div>
            <OperatorsStatistics :statistics="statistics" />
          </el-tab-pane>
          <el-tab-pane label="Операторы" name="operators">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить оператора
              </el-button>
              <OperatorsTable :operators="operators"  />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
  <el-drawer v-model="dialogVisible" title="Добавить оператора" :before-close="handleClose" direction="ltr">
    <AddOperatorForm @close="dialogVisible = false"  :isEditing="false" />
  </el-drawer>
</template>

<style scoped>
@import '@/assets/styles/main.css';
</style>
