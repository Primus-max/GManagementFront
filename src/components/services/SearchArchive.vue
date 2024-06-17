<script setup>
import { ref } from 'vue';

import { useShiftsStore } from 'src/stores/shiftsStore';

const props = defineProps({
    names: {
      type: Array,
      required: true
    }
  });
  
  const shiftsStore = useShiftsStore();
  const date = ref(null);
  const operator = ref(null);
  
  // Обновление даты
  const updateDate = (value) => {
    date.value = value;
  };
  
  // Обновление оператора
  const updateOperator = (value) => {
    operator.value = value;
  };
  
  // Поиск
  const search = async () => {
    const searchParams = {
      startDate: date.value ? date.value[0] : null,
      endDate: date.value ? date.value[1] : null,
      operator: operator.value,
      limit: shiftsStore.limit,
      offset: shiftsStore.offset
    };
  
    await shiftsStore.searchShifts(searchParams);
  };
  
</script>
  

<template>
    <div class="search-archive-wrapper">
      <div class="search-archive">
        <p>Выбрать по:</p>
  
        <div class="picker date-picker">
          <p class="label-select">дате</p>
          <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
                          end-placeholder="до" @change="updateDate" />
        </div>
  
        <div class="picker operator-picker">
          <p class="label-select">оператору</p>
          <el-select v-model="operator" @change="updateOperator" placeholder="Выберите оператора">
            <el-option v-for="name in names" :key="name" :label="name" :value="name" />
          </el-select>
        </div>
  
        <el-button type="primary" @click="search">Поиск</el-button>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  .search-archive-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .search-archive {
    width: 90%;
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
  
  .amount-picker {
    width: 200px;
  }
  
  .label-select {
    margin-right: 20px;
  }
  </style>
  