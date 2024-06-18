<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddGirlForm from 'src/components/modals/AddGirlForm.vue';
import NoResultsMessage from 'src/components/NoResultsMessage.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import GirlsStatistics from 'src/components/tables/GirlsStatistics.vue';
import GirlsTable from 'src/components/tables/GirlsTable.vue';
import { useGirlsStatisticsStore } from 'src/stores/girlsStatisticsStore';
import { useGirlsStore } from 'src/stores/girlsStore';

const girlsStatisticsStore = useGirlsStatisticsStore();
const girlsStore = useGirlsStore();
const activeTab = ref('statistics');
const dialogVisible = ref(false);
const currentPage = ref(1);
const pageSize = ref(3);


const girls = computed(() => girlsStore.items);
const total = computed(() => girlsStatisticsStore.totalItems);
const statistics = computed(() => {
  return girlsStatisticsStore.statistics?.slice().reverse();
});


const fetchStatisticsDeatails = async (page = 1) => {
  const searchParams = {
    limit: pageSize.value,
    offset: (page - 1) * pageSize.value,
  };
  await girlsStatisticsStore.searchItems(searchParams);
};


onMounted(async () => {
  await fetchStatisticsDeatails();
  await girlsStore.fetchItems();
});

const handlePageChange = async (page) => {
  currentPage.value = page;
  await fetchStatisticsDeatails(page);
};

</script>

<template>
  <div class="page girls-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="search-header-wrapper">
              <SearchArchive :store="girlsStatisticsStore" :users="girlsStore.items" />
            </div>

            <GirlsStatistics :statistics="statistics" :girls="girls" v-if="statistics?.length > 0" />
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
</style>
