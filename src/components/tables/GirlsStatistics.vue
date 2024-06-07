<script setup>
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
    <el-table-column prop="username" label="Девушка"></el-table-column>
    <el-table-column prop="username" label="TG"></el-table-column> 
    <el-table-column prop="totalOrders" label="Смены"></el-table-column>
    <el-table-column prop="username" label="Часы"></el-table-column>
    <el-table-column prop="username" label="Гости"></el-table-column>
    <el-table-column prop="username" label="Уходы"></el-table-column>
    <el-table-column prop="username" label="Доход"></el-table-column> 
    <el-table-column prop="username" label="% Оператора"></el-table-column>         
    <el-table-column prop="totalAmount" label="Прибыль" width="100"></el-table-column>
  </el-table>
</template>

<style scoped>
/* стили для компонента */
</style>
