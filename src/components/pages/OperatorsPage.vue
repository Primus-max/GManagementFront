<template>
    <div>
      <el-button type="primary" @click="dialogVisible = true">
        <i class="el-icon-plus"></i> Добавить оператора
      </el-button>
  
      <el-drawer
        v-model="dialogVisible"
        title="Добавить оператора"
        :before-close="handleClose"
        direction="ltr"
      >
        <AddOperatorForm @close="dialogVisible = false" />
      </el-drawer>
  
      <el-table :data="operators" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="username" label="Имя" width="150"></el-table-column>
        <el-table-column prop="group_id" label="Группа" width="100"></el-table-column>
        <el-table-column prop="balance" label="Баланс" width="100"></el-table-column>
      </el-table>
    </div>
  </template>
  
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
  
  <style scoped>
  .el-table, .el-button {
    margin-top: 20px;
  }
  </style>
  