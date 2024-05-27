<template>
    <div class="table-wrapper">
      <el-button type="primary" @click="dialogVisible = true">
        <i class="el-icon-plus"></i> Добавить девушку
      </el-button>
  
      <el-drawer
        v-model="dialogVisible"
        title="Добавить девушку"
        :before-close="handleClose"
        direction="ltr"
      >
        <AddGirlForm @close="dialogVisible = false" />
      </el-drawer>
  
      <el-table :data="girls" style="width: 100%" class="girls-table">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="name" label="Имя" width="150"></el-table-column>
        <el-table-column prop="telegram" label="Телеграмм аккаунт" width="200"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

import AddGirlForm from '@/components/modals/AddGirlForm.vue';

const dialogVisible = ref(false);
  
  const girls = ref([
    { id: 1, name: 'Girl1', telegram: '@girl1' },
    { id: 2, name: 'Girl2', telegram: '@girl2' }
    // Здесь добавьте начальные данные девушек
  ]);
  
  const handleClose = () => {
    dialogVisible.value = false;
  };
  
</script>
  
  <style scoped>
  .table-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .girls-table {
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 20px;
  }
  
  .el-table, .el-button {
    margin-top: 20px;
  }
  </style>
  