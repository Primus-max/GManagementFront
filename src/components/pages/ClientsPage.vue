<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddClientForm from '@/components/modals/AddClientForm.vue';
import SearchStatistics from '@/components/services/SearchStatistics.vue';
import ClientsStatistics from '@/components/tables/ClientsStatistics.vue';
import ClientsTable from '@/components/tables/ClientsTable.vue';
import { useClientsStatisticsStore } from '@/stores/clientsStatisticsStore';

const clientsStore = useClientsStatisticsStore();
const activeTab = ref('statistics');
const dialogVisible = ref(false);


const clients = ref([
  { id: 1, clientName: 'Олег', tg: 'ert', phone: 79003453434, bonus: 8 },
  { id: 2, clientName: 'Валера', tg: 'ert', balance: 200, bonus: 1000 }
]);

const statistics = ref([
  { id: 1, username: 'Girl1', totalOrders: 120, totalAmount: 1200 },
  { id: 2, username: 'Girl2', totalOrders: 180, totalAmount: 1800 }
]);
</script>

<template>
  <div class="page clients-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="statistics-wrapper">
              <div class="search-header-wrapper">
                <SearchStatistics searchType="clients" :names="statistics.map(client => client.name)" />
              </div>
              <ClientsStatistics :statistics="statistics" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="Клиенты" name="clients">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить клиента
              </el-button>
              <el-drawer v-model="dialogVisible" title="Добавить клиента" :before-close="handleClose" direction="ltr">
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