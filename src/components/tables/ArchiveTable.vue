<template>
    <el-table :data="orders" class="table" size="large">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="girl" label="Девушка" max-width="60"></el-table-column>
      <el-table-column prop="client_name" label="Клиент"></el-table-column>
      <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
      <el-table-column prop="split_percentage" label="Split %"></el-table-column>
      <el-table-column prop="comment" label="Комментарий"></el-table-column>
      <el-table-column label="Действия">
        <template v-slot="scope">
          <el-button type="text" class="control-button" icon="Delete" @click="deleteOrder(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
import { ref } from 'vue';

const props = defineProps({
    orders: {
      type: Array,
      required: true
    }
  });
  
  const deleteOrder = (row) => {
    // Здесь ваша логика удаления заказа
  };
  
</script>
  
  <style scoped>
  /* Стили для таблицы */
  </style>
  