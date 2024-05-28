<template>
    <div class="orders-wrapper">
      <el-button type="primary" @click="dialogVisible = true">
        <i class="el-icon-plus"></i> Добавить заказ
      </el-button>
  
      <el-drawer v-model="dialogVisible" title="Добавить заказ" :before-close="handleClose" direction="ltr">
        <AddOrderForm @close="dialogVisible = false" />
      </el-drawer>
  
      <el-table :data="orders" class="orders-table" size="large">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="girl" label="Девушка"></el-table-column>
        <el-table-column prop="client_name" label="Имя клиента"></el-table-column>
        <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
        <el-table-column prop="split_percentage" label="Процент разделения"></el-table-column>
        <el-table-column prop="comment" label="Комментарий"></el-table-column>
        <el-table-column label="Действия">
          <template v-slot="scope">
            <el-checkbox v-model="scope.row.is_extended">Продление</el-checkbox>
            <el-checkbox v-model="scope.row.is_cancelled">Отмена</el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddOrderForm from '@/components/modals/AddOrderForm.vue';

const dialogVisible = ref(false);
  
  const orders = ref([
    { id: 1, girl: 'Девушка1', client_name: 'Клиент1', amount: 100, split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
    { id: 2, girl: 'Девушка2', client_name: 'Клиент2', amount: 200, split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
    // Здесь добавьте начальные данные заказов
  ]);
  
  const handleClose = () => {
    dialogVisible.value = false;
  };
  
  
</script>
  
  <style scoped>
  .orders-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .orders-table {
    display: flex;
    margin-top: 20px;
  }
  
  .el-button {
    margin-top: 20px;
  }
  </style>
  