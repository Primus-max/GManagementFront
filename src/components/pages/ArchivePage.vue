<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import SearchArchive from 'src/components/services/SearchArchive.vue';
import ArchiveTable from 'src/components/tables/ArchiveTable.vue';
import { useShiftsStore } from 'src/stores/shiftsStore';

import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const activeTab = ref('operators');
const shiftsStore = useShiftsStore();

onMounted(async () => {
  await shiftsStore.fetchShiftsWithDetails();
});

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
              <SearchArchive type="operators" :names="['Operator1', 'Operator2']" />
            </div>
            <ArchiveTable :shifts="shifts" />
          </el-tab-pane>
          <el-tab-pane label="Девушки" name="girls" disabled>
            <SearchArchive type="girls" :names="['Girl1', 'Girl2']" />
            <!-- <ArchiveTable :shifts="shifts" /> -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
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