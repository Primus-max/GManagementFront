<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';
import SearchStatistics from '@/components/services/SearchStatistics.vue';
import OperatorsStatistics from '@/components/tables/OperatorsStatistics.vue';
import OperatorsTable from '@/components/tables/OperatorsTable.vue';

const activeTab = ref('statistics');
const dialogVisible = ref(false);

const operators = ref([
  { id: 1, username: 'Operator1', group_id: 'Group1', balance: 100 },
  { id: 2, username: 'Operator2', group_id: 'Group2', balance: 200 }
]);

const statistics = ref([
  { id: 1, username: 'Operator1', totalOrders: 100, totalAmount: 1000 },
  { id: 2, username: 'Operator2', totalOrders: 150, totalAmount: 1500 }
]);

const handleClose = () => {
  dialogVisible.value = false;
};

const editOperator = (operator) => {
  console.log('Редактировать оператора:', operator);
};

const deleteOperator = (operator) => {
  console.log('Удалить оператора:', operator);
};
</script>

<template>
  <div class="page operators-page">
    <div class="page-wrapper">
      <el-card>
      <el-tabs v-model="activeTab" tab-position="left" >
        <el-tab-pane label="Статистика" name="statistics">
          <div class="search-header-wrapper">
            <SearchStatistics searchType="operators" :names="operators.map(operator => operator.username)" />
            </div>
            <OperatorsStatistics  :statistics="statistics" />          
        </el-tab-pane>
        <el-tab-pane label="Операторы" name="operators">
          <div class="table-wrapper">
            <el-button type="primary" @click="dialogVisible = true">
              <i class="el-icon-plus"></i> Добавить оператора
            </el-button>
            <el-drawer v-model="dialogVisible" title="Добавить оператора" :before-close="handleClose" direction="ltr">
              <AddOperatorForm @close="dialogVisible = false" />
            </el-drawer>
            <OperatorsTable :operators="operators" @editOperator="editOperator" @deleteOperator="deleteOperator" />
          </div>
        </el-tab-pane>       
      </el-tabs>
    </el-card>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/main.css';


</style>