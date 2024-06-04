<script setup>
const props = defineProps({
    clients: {
      type: Array,
      required: true
    }
  });
</script>

<template>
    
      <el-table :data="clients" class="table" size="large">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="clientName" label="Имя"></el-table-column>
        <el-table-column prop="tg" label="TG"></el-table-column>
        <el-table-column prop="phone" label="Телефон"></el-table-column>
        <el-table-column prop="bonus" label="Бонусы"></el-table-column>

        <!-- Другие столбцы, если необходимо -->
      </el-table>
    
  </template>
  

  
  <style  scoped>
@import '@/assets/styles/main.css';
  </style>
  