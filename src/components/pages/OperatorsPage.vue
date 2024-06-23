<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddOperatorForm from 'src/components/modals/AddOperatorForm.vue';
import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import LoadingPage from 'src/components/services/LoadingPage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import OperatorsStatistics from 'src/components/tables/OperatorsStatistics.vue';
import OperatorsTable from 'src/components/tables/OperatorsTable.vue';
import { PAGE_ITEMS_LIMIT } from 'src/constants';
import {
  useOperatorsStatisticsStore,
} from 'src/stores/operatorsStatisticsStore';
import { useOperatorsStore } from 'src/stores/operatorsStore';

const operatorsStore = useOperatorsStore();
const operatorsStatisticsStore = useOperatorsStatisticsStore();

const activeTab = ref('statistics');
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(PAGE_ITEMS_LIMIT);
const isLoading = ref(true);

const total = computed(() => operatorsStatisticsStore.totalItems);
const operators = computed(() => operatorsStore.items);
const statistics = computed(() => { 
  return operatorsStatisticsStore.statistics?.slice().reverse(); 
});

const fetchStatisticsDeatails = async (page = 1) => {
  isLoading.value = true;
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await operatorsStatisticsStore.searchItems(searchParams);
};

onMounted(async () => {  
  await fetchStatisticsDeatails();
  await operatorsStore.fetchItems();
  isLoading.value = false;
});


const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchStatisticsDeatails(page);  
  isLoading.value = false;
};
</script>

<template>

  <LoadingPage :isLoading="isLoading" />

  <div class="page operators-page" v-if="!isLoading">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics" >
            <div class="search-header-wrapper">
              <SearchArchive :store="operatorsStatisticsStore" :users="operatorsStore.items" :searchType="'operators'"/>
            </div>
            <OperatorsStatistics :statistics="statistics" v-if="statistics?.length > 0"/>
            <NoResultsMessage v-else message="Для указанного поиска ничего не найдено" />
          </el-tab-pane>
          <el-tab-pane label="Операторы" name="operators" >
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить оператора
              </el-button>
              <OperatorsTable :operators="operators" />
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

  <!-- Добавить оператора -->
  <el-drawer v-model="dialogVisible" title="Добавить оператора" direction="ltr">
    <AddOperatorForm @close="dialogVisible = false" :isEditing="false" />
  </el-drawer>

</template>

<style scoped>
@import 'src/assets/styles/main.css';
</style>
