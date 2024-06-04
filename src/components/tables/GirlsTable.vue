<script setup>
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const props = defineProps({
  girls: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['editGirl', 'deleteGirl']);

const handleEdit = (girl) => {
  emits('editGirl', girl);
};

const handleDelete = (girl) => {
  emits('deleteGirl', girl);
};
</script>

<template>
  <el-table :data="girls" class="table" size="large" fit>
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="username" label="Девушка"></el-table-column>
    <el-table-column prop="group_id" label="Группа"></el-table-column>
    <el-table-column prop="balance" label="Баланс" width="100"></el-table-column>
    <el-table-column label="Действия" width="150">       
      <template #default="{row}">
        <el-button el-button type="text" class="control-button" :icon="Edit" @click="handleEdit(row)" />
        <el-button type="text" class="control-button" :icon="Delete" @click="handleDelete(row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
@import '@/assets/styles/main.css';
</style>
