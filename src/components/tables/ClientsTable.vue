<script setup>
import { ref } from 'vue';

import AddClientForm from '@/components/modals/AddClientForm.vue';
import { useClientsStore } from '@/stores/clientsStore';

const clientsStore = useClientsStore();
const dialogVisible = ref(false);
const editingClient = ref(null);

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
    <el-table-column prop="name" label="Имя"></el-table-column>
    <el-table-column prop="tg" label="TG"></el-table-column>
    <el-table-column prop="phone" label="Телефон"></el-table-column>
    <!-- <el-table-column prop="bonus" label="Бонусы"></el-table-column> -->
  </el-table>

  <el-drawer v-model="dialogVisible" title="Редактировать клиента" direction="ltr">
    <AddClientForm @close="dialogVisible = false" :client="editingClient" :isEditing="true" />
  </el-drawer>

</template>



<style scoped>
@import '@/assets/styles/main.css';
</style>