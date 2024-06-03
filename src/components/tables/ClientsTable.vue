<template>
    <div class="clients-table">
      <el-table :data="clients" class="table" size="small">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="name" label="Имя"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <!-- Другие столбцы, если необходимо -->
      </el-table>
    </div>
  </template>
  
  <script setup>
import { defineProps } from 'vue';

const props = defineProps({
    clients: {
      type: Array,
      required: true
    }
  });
  
</script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  