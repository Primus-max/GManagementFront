<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  statistics: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <el-table :data="statistics" class="table" size="large" fit>
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="username" label="Клиент"></el-table-column>
    <el-table-column prop="telegram" label="TG"></el-table-column> 
    <el-table-column prop="totalOrders" label="Смены"></el-table-column>
    <el-table-column prop="hours" label="Часы"></el-table-column>
    <el-table-column prop="guests" label="Гости"></el-table-column>
    <el-table-column prop="leaves" label="Уходы"></el-table-column>
    <el-table-column prop="revenue" label="Доход"></el-table-column> 
    <el-table-column prop="operatorPercentage" label="% Оператора"></el-table-column>         
    <el-table-column prop="totalAmount" label="Прибыль" width="100"></el-table-column>
  </el-table>
</template>

<style scoped>
/* стили для компонента */
</style>
