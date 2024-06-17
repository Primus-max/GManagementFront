<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import { useOperatorsStore } from 'src/stores/operatorsStore';
import { useShiftsStore } from 'src/stores/shiftsStore';

const props = defineProps({
    searchType: {
      type: String,
      required: true
    }
  });
  
  const shiftsStore = useShiftsStore();
  const  operatorsStore = useOperatorsStore();
  const date = ref(null);
  const selectedOperator = ref(null);
  
onMounted(async () => {
  await operatorsStore.fetchItems();  
});

// Обновление даты
  const updateDate = (value) => {
    date.value = value;
  };
  
  // Обновление оператора
  const updateOperator = (value) => {
    selectedOperator.value = value;
  };
  
  // Поиск
  const search = async () => {
    const searchParams = {
      startDate: date.value ? date.value[0] : null,
      endDate: date.value ? date.value[1] : null,
      operator: selectedOperator.value,
      limit: shiftsStore.limit,
      offset: shiftsStore.offset
    };
  
    await shiftsStore.searchShifts(searchParams);
  };
  
  const reset = async() => {    
    await shiftsStore.resetPagination();
    date.value = null;
    selectedOperator.value = null;
  }
</script>
  

<template>
    <div class="search-archive-wrapper">
      <div class="search-archive">
        <p>Выбрать по:</p>
  
        <div class="picker date-picker">
          <p class="label-select">дате</p>
          <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
                          end-placeholder="до" @change="updateDate" clearable/>
        </div>
  
        <div class="picker operator-picker">
          <p class="label-select">оператору</p>
          <el-select v-model="selectedOperator" @change="updateOperator" placeholder="Выберите оператора" clearable filterable>
            <el-option v-for="operator in operatorsStore.items" :key="operator.id" :label="operator.name" :value="operator.id" />
          </el-select>
        </div>
  
        <div class="control-buttons">
            <el-button type="primary" @click="search">Поиск</el-button>
            <el-button  @click="reset">Сбросить</el-button>
        </div>
        
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
  