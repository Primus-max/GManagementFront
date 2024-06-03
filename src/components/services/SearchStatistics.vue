<script setup>
import {
  ref,
  watch,
} from 'vue';

import { useGirlsStatisticsStore } from '@/stores/girlsStatisticsStore';
import { useSearchStatisticsStore } from '@/stores/operatorsStatisticsStore';

// Пропсы для передачи типа (operators или girls) и списка имен
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['operators', 'girls'].includes(value)
  },
  names: {
    type: Array,
    required: true
  }
});

const searchStore = props.type === 'operators' ? useSearchStatisticsStore() : useGirlsStatisticsStore();
const date = ref(searchStore.date);
const selectedName = ref(searchStore.operator || searchStore.girl);

const updateDate = (newDate) => {
  searchStore.setDate(newDate);
};

const updateSelectedName = (newName) => {
  searchStore.setOperator(newName); // Здесь автоматически определяется, оператор это или девушка
};

const fetchStatistics = () => {
  searchStore.fetchStatistics();
};

// Синхронизация локальных переменных с состоянием хранилища
watch(date, (newDate) => searchStore.setDate(newDate));
watch(selectedName, (newName) => searchStore.setOperator(newName) || searchStore.setGirl(newName));

</script>

<template>
  <div class="search-statistics-wrapper">
    <div class="search-statistics">
      <p>Выбрать по:</p>
      <div class="picker date-picker">
        <p class="label-select">дате</p>
        <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
          end-placeholder="до" @change="updateDate" />
      </div>
      <div class="picker name-picker">
        <p class="label-select">{{ props.type === 'operators' ? 'оператору' : 'девушке' }}</p>
        <el-select v-model="selectedName" @change="updateSelectedName" :placeholder="`Выберите ${props.type === 'operators' ? 'оператора' : 'девушку'}`" >
          <el-option v-for="name in props.names" :key="name" :label="name" :value="name"  />
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

.name-picker {
  width: 300px;
}

.label-select {
  margin-right: 20px;
}
</style>
