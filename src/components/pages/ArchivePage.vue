<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import ArchiveTable from 'src/components/tables/ArchiveTable.vue';
import { useShiftsStore } from 'src/stores/shiftsStore';

const activeTab = ref('operators');
const shiftsStore = useShiftsStore();

const total = computed(() => shiftsStore.totalShifts);
const currentPage = ref(1);
const pageSize = ref(3);

const fetchShifts = async (page = 1) => {
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await shiftsStore.fetchShiftsWithDetails(searchParams);
};

onMounted(async () => {
  await fetchShifts();
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
  <div class="page archive-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Смены" name="operators">
            <div class="search-header-wrapper">
              <SearchArchive @search="fetchShifts" />
            </div>
            <ArchiveTable :shifts="shifts" v-if="false" />
              <NoResultsMessage v-else message="Для указанного поиска ничего не найдено" />
          </el-tab-pane>
          <el-tab-pane label="Девушки" name="girls" disabled>
            <SearchArchive type="girls" :names="['Girl1', 'Girl2']" />
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
