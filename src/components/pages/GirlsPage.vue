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
  
      <el-table :data="girls" class="girls-table" size="large" highlight-current-row="true">
        <el-table-column prop="id" label="ID" width="100px"></el-table-column>
        <el-table-column prop="name" label="Имя"></el-table-column>
        <el-table-column prop="telegram" label="Телеграмм аккаунт"></el-table-column>
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .girls-table {
    width: 100%;
    margin-top: 20px;  
  }
  

  .el-button {
    margin-top: 20px;
  }

  </style>
  