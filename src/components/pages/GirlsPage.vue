<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddGirlForm from 'src/components/modals/AddGirlForm.vue';
import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import LoadingPage from 'src/components/services/LoadingPage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import GirlsStatistics from 'src/components/tables/GirlsStatistics.vue';
import GirlsTable from 'src/components/tables/GirlsTable.vue';
import { PAGE_ITEMS_LIMIT } from 'src/constants';
import { useGirlsStatisticsStore } from 'src/stores/girlsStatisticsStore';
import { useGirlsStore } from 'src/stores/girlsStore';

const girlsStatisticsStore = useGirlsStatisticsStore();
const girlsStore = useGirlsStore();
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(PAGE_ITEMS_LIMIT);
const me = JSON.parse(localStorage.getItem('me'));
const isAdmin = ref(me?.role === 'Admin');
const activeTab = ref(isAdmin.value ? 'statistics': 'girls');

// Состояние загрузки данных
const isLoading = ref(true);

const girls = computed(() => girlsStore.items);
const total = computed(() => girlsStatisticsStore.totalItems);
const statistics = computed(() => girlsStatisticsStore.statistics?.slice().reverse());

const fetchStatisticsDetails = async (page = 1) => {
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await girlsStatisticsStore.searchItems(searchParams);
};

onMounted(async () => {
  try {
    await Promise.all([
      fetchStatisticsDetails(),
      girlsStore.fetchItems(),
    ]);
  } catch (error) {
    console.error('Failed to fetch data:', error);    
  } finally {
    setTimeout(() => isLoading.value = false, 100);    
  }
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchStatisticsDetails(page);
};
</script>

<template>
  
<LoadingPage :isLoading="isLoading" />

  <div v-if="!isLoading" class="page girls-page" >
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics" v-if="isAdmin">
            <div class="search-header-wrapper">
              <SearchArchive :store="girlsStatisticsStore" :users="girlsStore.items" :searchType="'girls'"/>
            </div>
            <GirlsStatistics v-if="statistics && statistics.length > 0" :statistics="statistics" :girls="girls" />
            <NoResultsMessage v-else message="Для указанного поиска ничего не найдено" />
          </el-tab-pane>
          <el-tab-pane label="Девушки" name="girls">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить девушку
              </el-button>
              <GirlsTable :girls="girls" />
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
  
  <!-- Добавить девушку -->
  <el-drawer v-model="dialogVisible" title="Добавить девушку" direction="ltr">
    <AddGirlForm @close="dialogVisible = false" :isEditing="false" />
  </el-drawer>
</template>

<style scoped>
@import 'src/assets/styles/main.css';
/* .loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #333;  
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.2s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
} */
</style>
