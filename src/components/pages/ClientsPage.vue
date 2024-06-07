<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';

import { ElDrawer } from 'element-plus';

import AddClientForm from '@/components/modals/AddClientForm.vue';
import SearchStatistics from '@/components/services/SearchStatistics.vue';
import ClientsStatistics from '@/components/tables/ClientsStatistics.vue';
import ClientsTable from '@/components/tables/ClientsTable.vue';
import { useClientsStore } from '@/stores/clientsStore';

const clientsStore = useClientsStore();
const activeTab = ref('statistics');
const dialogVisible = ref(false);

onMounted(async () => {
  await clientsStore.fetchItems();
});

const clients = computed(() => clientsStore.items);
</script>

<template>
  <div class="page clients-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="statistics-wrapper">
              <div class="search-header-wrapper">
                <SearchStatistics searchType="clients" :names="clients.map(client => client.name)" />
              </div>
              <ClientsStatistics :statistics="statistics" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="Клиенты" name="clients">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить клиента
              </el-button>
              <el-drawer v-model="dialogVisible" title="Добавить клиента"  direction="ltr">
                <AddClientForm @close="dialogVisible = false" />
              </el-drawer>
              <ClientsTable :clients="clients" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/main.css';
</style>
