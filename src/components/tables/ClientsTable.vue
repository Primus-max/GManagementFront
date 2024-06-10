<script setup>
import { ref } from 'vue';

import AddClientForm from 'src/components/modals/AddClientForm.vue';
import { useClientsStore } from 'src/stores/clientsStore';

import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const clientsStore = useClientsStore();
const dialogVisible = ref(false);
const editingClient = ref(null);

const props = defineProps({
  clients: {
    type: Array,
    required: true
  }
});

const editClient = (client) => {
  editingClient.value = client;
  dialogVisible.value = true;
};

const deleteClient = async (client) => {
 await clientsStore.deleteItem(client);
};
</script>

<template>

  <el-table :data="clients" class="table" size="large">
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="name" label="Имя"></el-table-column>
    <el-table-column prop="tg" label="TG"></el-table-column>
    <el-table-column prop="phone" label="Телефон"></el-table-column>
    <!-- <el-table-column prop="bonus" label="Бонусы"></el-table-column> -->
    <el-table-column label="Действия" width="120">
        <template #default="{ row }">
          <el-button type="text" class="control-button" :icon="Edit" @click="editClient(row)"></el-button>
          <el-button type="text" class="control-button" :icon="Delete" @click="deleteClient(row)"></el-button>
        </template>
      </el-table-column>
  </el-table>

  <el-drawer v-model="dialogVisible" title="Редактировать клиента" direction="ltr">
    <AddClientForm @close="dialogVisible = false" :client="editingClient" :isEditing="true" />
  </el-drawer>

</template>



<style lang="css" scoped>
@import 'src/assets/styles/main.css';
</style>