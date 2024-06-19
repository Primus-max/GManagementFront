<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
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
const activeTab = ref('statistics');
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(3);

const clients = computed(() => clientsStore.items);
const total = computed(() => clientsStatisticsStore.totalItems);
const statistics = computed(() => {
  return clientsStatisticsStore.statistics?.slice().reverse();

});

const fetchStatisticsDeatails = async (page = 1) => {
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await clientsStatisticsStore.searchItems(searchParams);
};

onMounted(async () => {
  await fetchStatisticsDeatails();
  await clientsStore.fetchItems();
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchStatisticsDeatails(page);
};
</script>

<template>
  <div class="page clients-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="statistics-wrapper">
              <div class="search-header-wrapper">
                <SearchArchive searchType="clients" :store="clientsStatisticsStore" :users="clientsStore.items" />
              </div>

              <ClientsStatistics :statistics="statistics" v-if="statistics?.length > 0"/>
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

  <!-- Добавить клиента -->
  <el-drawer v-model="dialogVisible" title="Добавить клиента" direction="ltr">
    <AddClientForm @close="dialogVisible = false" />
  </el-drawer>

</template>

<style lang="css" scoped>
@import 'src/assets/styles/main.css';
</style>
