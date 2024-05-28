<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';

const dialogVisible = ref(false);

const operators = ref([
  { id: 1, username: 'Operator1', group_id: 'Group1', balance: 100 },
  { id: 2, username: 'Operator2', group_id: 'Group2', balance: 200 }
  // Здесь добавьте начальные данные операторов
]);

const handleClose = () => {
  // Сброс формы при закрытии Drawer
  dialogVisible.value = false;
  // $refs.addOperatorForm.cancelForm();
};

</script>

<template>
  <div class="table-wrapper">
    <el-button type="primary" @click="dialogVisible = true">
      <i class="el-icon-plus"></i> Добавить оператора
    </el-button>

    <el-drawer v-model="dialogVisible" title="Добавить оператора" :before-close="handleClose" direction="ltr">
      <AddOperatorForm @close="dialogVisible = false" />
    </el-drawer>

    <el-table :data="operators"  class="opertors-table" size="large" >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="username" label="Имя" ></el-table-column>
      <el-table-column prop="group_id" label="Группа" ></el-table-column>
      <el-table-column prop="balance" label="Баланс" ></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;  
}

.opertors-table {
  display: flex;  
  margin-top: 20px;
  /* color: white; */
}

.el-table,
.el-button {
  margin-top: 20px;
}

.hovered-row {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>