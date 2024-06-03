<script setup>
import { ref } from 'vue';

import { useSearchStatisticsStore } from '@/stores/operatorsStatisticsStore';

const searchStore = useSearchStatisticsStore();
const date = ref(searchStore.date);
const operator = ref(searchStore.operator);

const updateDate = (newDate) => {
  searchStore.setDate(newDate);
};

const updateOperator = (newOperator) => {
  searchStore.setOperator(newOperator);
};

const fetchStatistics = () => {
  searchStore.fetchStatistics();
};

</script>

<template>
  <div class="search-statistics-wrapper">
    <div class="search-statistics">
      <p>Выбрать по:</p>
      <div class="picker date-picker">
        <p class="label-select">дате</p>
        <el-date-picker v-model="localDateRange" type="daterange" range-separator="||" start-placeholder="от"
          end-placeholder="до" @change="updateDateRange" />
      </div>
      <div class="picker operator-picker">
        <p class="label-select">оператору</p>
        <el-select v-model="localOperator" @change="updateOperator" placeholder="Выберите оператора">
          <el-option label="Valera" value="Valera" />
          <el-option label="Petya" value="Petya" />
          <el-option label="Nina" value="Nina" />
        </el-select>
      </div>
      <el-button type="primary" @click="fetchStatistics">Поиск</el-button>
    </div>
  </div>
</template>



<style scoped>
.search-statistics-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.search-statistics {
  width: 80%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.operator-picker {
  width: 300px;
}

.label-select {
  margin-right: 20px;
}
</style>