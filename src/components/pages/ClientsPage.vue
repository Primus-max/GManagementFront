<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddClientForm from 'src/components/modals/AddClientForm.vue';
import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import ClientsStatistics from 'src/components/tables/ClientsStatistics.vue';
import ClientsTable from 'src/components/tables/ClientsTable.vue';
import { useClientsStatisticsStore } from 'src/stores/clientsStatisticsStore';
import { useClientsStore } from 'src/stores/clientsStore';

const clientsStore = useClientsStore();
const clientsStatisticsStore = useClientsStatisticsStore();
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(3);
const me = JSON.parse(localStorage.getItem('me'));
const isRole = ref(me?.role === 'Admin');
const activeTab = ref(isRole ? 'statistics': 'clients');

// Состояние загрузки данных
const isLoading = ref(true);

const clients = computed(() => clientsStore.items);
const total = computed(() => clientsStatisticsStore.totalItems);
const statistics = computed(() => clientsStatisticsStore.statistics?.slice().reverse());

const fetchStatisticsDetails = async (page = 1) => {
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await clientsStatisticsStore.searchItems(searchParams);
};

onMounted(async () => {
  try {
    await Promise.all([
      fetchStatisticsDetails(),
      clientsStore.fetchItems(),
    ]);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Обработка ошибок, например, показ сообщения об ошибке
  } finally {
    isLoading.value = false; // Устанавливаем состояние загрузки в false после загрузки данных
  }
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchStatisticsDetails(page);
};
</script>

<template>
  <div v-if="!isLoading" class="page clients-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics" v-if="isRole">
            <div class="statistics-wrapper">
              <div class="search-header-wrapper">
                <SearchArchive searchType="clients" :store="clientsStatisticsStore" :users="clientsStore.items" />
              </div>

              <ClientsStatistics v-if="statistics && statistics.length > 0" :statistics="statistics" />
              <NoResultsMessage v-else message="Для указанного поиска ничего не найдено" />

            </div>
          </el-tab-pane>
          <el-tab-pane label="Клиенты" name="clients">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить клиента
              </el-button>

              <ClientsTable :clients="clients" />

            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- Пагинация -->
    <div>
      <el-pagination small background layout="prev, pager, next" :total="total" :page-size="pageSize"
        :current-page="currentPage" @current-change="handlePageChange" class="mt-4" />
    </div>

  </div>
  <div v-else class="loading-message">Загрузка...</div>
  <!-- Добавить клиента -->
  <el-drawer v-model="dialogVisible" title="Добавить клиента" direction="ltr">
    <AddClientForm @close="dialogVisible = false" />
  </el-drawer>

</template>

<style lang="css" scoped>
@import 'src/assets/styles/main.css';

.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #333;
}
</style>
