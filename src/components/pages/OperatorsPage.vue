<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import { ElDrawer } from 'element-plus';
import AddOperatorForm from 'src/components/modals/AddOperatorForm.vue';
import SearchArchive from 'src/components/services/SearchArchive.vue';
import SearchStatistics from 'src/components/services/SearchStatistics.vue';
import OperatorsStatistics from 'src/components/tables/OperatorsStatistics.vue';
import OperatorsTable from 'src/components/tables/OperatorsTable.vue';
import { useOperatorsStore } from 'src/stores/operatorsStore';

const operatorsStore = useOperatorsStore();
const activeTab = ref('statistics');
const dialogVisible = ref(false);

onMounted(async () => {
  await operatorsStore.fetchItems();  
});

const operators = computed(() => operatorsStore.items);

</script>

<template>
  <div class="page operators-page">
    <div class="page-wrapper">
      <el-card>
        <el-tabs v-model="activeTab" tab-position="left">
          <el-tab-pane label="Статистика" name="statistics">
            <div class="search-header-wrapper">
              <SearchArchive searchType="operators"  />
            </div>
            <OperatorsStatistics :statistics="statistics" />
          </el-tab-pane>
          <el-tab-pane label="Операторы" name="operators">
            <div class="table-wrapper">
              <el-button type="primary" @click="dialogVisible = true">
                <i class="el-icon-plus"></i> Добавить оператора
              </el-button>
              <OperatorsTable :operators="operators"  />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
  <el-drawer v-model="dialogVisible" title="Добавить оператора"  direction="ltr">
    <AddOperatorForm @close="dialogVisible = false"  :isEditing="false" />
  </el-drawer>
</template>

<style scoped>
@import 'src/assets/styles/main.css';
</style>
