<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';
import OperatorsTable from '@/components/tables/OperatorsTable.vue';


const dialogVisible = ref(false);

const operators = ref([
  { id: 1, username: 'Operator1', group_id: 'Group1', balance: 100 },
  { id: 2, username: 'Operator2', group_id: 'Group2', balance: 200 }
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
      <div class="table-wrapper">
        <el-button type="primary" @click="dialogVisible = true">
          <i class="el-icon-plus"></i> Добавить оператора
        </el-button>

        <el-drawer v-model="dialogVisible" title="Добавить оператора" :before-close="handleClose" direction="ltr">
          <AddOperatorForm @close="dialogVisible = false" />
        </el-drawer>
        <OperatorsTable :operators="operators" />     
      </div>
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



</style>
