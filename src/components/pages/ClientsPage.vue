<template>
    <div class="page clients-page">
      <div class="page-wrapper">
        <el-card>
        <el-tabs v-model="activeTab" tab-position="left" >
          <el-tab-pane label="Статистика" name="statistics">
            <div class="statistics-wrapper">
                <div class="search-header-wrapper">
              <SearchStatistics searchType="clients" :names="statistics.map(client => client.name)" />
              </div>
              <ClientsStatistics :statistics="clientStatistics" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="Клиенты" name="clients">
            <div class="table-wrapper">
              <ClientsTable :clients="clients" />
            </div>
          </el-tab-pane>
        </el-tabs>        
    </el-card>      
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

import SearchStatistics from '@/components/services/SearchStatistics.vue';
import { useClientsStatisticsStore } from '@/stores/clientsStatisticsStore';

const clientsStore = useClientsStatisticsStore();
 const activeTab = ref('statistics');
  
  const clientStatistics = ref([]);
  
  const clients = ref([
  { id: 1, client_name: 'Олег', tg: 'ert', phone: 79003453434 },
  { id: 2, client_name: 'Валера', tg: 'ert', balance: 200 }
]);

const statistics = ref([
  { id: 1, username: 'Girl1', totalOrders: 120, totalAmount: 1200 },
  { id: 2, username: 'Girl2', totalOrders: 180, totalAmount: 1800 }
]);
</script>
  
  <style lang="css" scoped>
@import '@/assets/styles/main.css';
  </style>
  