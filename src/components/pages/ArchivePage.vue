<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import LoadingPage from 'src/components/services/LoadingPage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import ArchiveTable from 'src/components/tables/ArchiveTable.vue';
import { PAGE_ITEMS_LIMIT } from 'src/constants';
import { useOperatorsStore } from 'src/stores/operatorsStore';
import { useShiftsStore } from 'src/stores/shiftsStore';

const activeTab = ref('operators');
const operatorsStore = useOperatorsStore();
const shiftsStore = useShiftsStore();

const total = computed(() => shiftsStore.totalShifts);
const currentPage = ref(1);
const pageSize = ref(PAGE_ITEMS_LIMIT);
const isLoading = ref(true);

const fetchShifts = async (page = 1) => {
  isLoading.value = true;
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await shiftsStore.fetchShiftsWithDetails(searchParams);
  isLoading.value = false;
};

onMounted(async () => {
  await fetchShifts();
  await operatorsStore.fetchItems();
  isLoading.value = false;
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchShifts(page);
};

const shifts = computed(() => {
  return shiftsStore.shiftsWithOrders.slice().reverse();
});
</script>

<template>

  <LoadingPage :isLoading="isLoading" />

  <div class="page archive-page" v-if="!isLoading">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Смены" name="operators">
            <div class="search-header-wrapper">
              <SearchArchive @search="fetchShifts" :store="shiftsStore" :users="operatorsStore.items" />
            </div>
            <ArchiveTable :shifts="shifts" v-if="shifts.length > 0" />
            <NoResultsMessage v-else message="Для указанного поиска ничего не найдено" />
          </el-tab-pane>
          <el-tab-pane label="Девушки" name="girls" disabled>
            <!-- <SearchArchive type="girls" :names="['Girl1', 'Girl2']" /> -->
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
</template>

<style scoped>
@import 'src/assets/styles/main.css';

.page-header-wrapper {
  width: 100%;
  height: 40px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.date-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.label-select {
  margin: 0 20px 0 20px;
}
</style>
