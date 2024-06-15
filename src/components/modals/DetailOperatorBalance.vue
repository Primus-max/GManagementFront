<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
} from 'vue';

import { useShiftsStore } from 'src/stores/shiftsStore';

const shiftsStore = useShiftsStore();
const emits = defineEmits(['close']);

onBeforeMount(async () => {
  await shiftsStore.getUnpaidShifts();  
});


const formattedUnpaidShifts = computed(() => {
  return shiftsStore.unpaidShifts.map(shift => ({
    ...shift,
    date: formatDate(shift.date),
    income: shift.income.toFixed(1) + ' ₽'
  }));
});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};
</script>

<template>
    <el-table :data="formattedUnpaidShifts">
        <el-table-column property="date" label="Дата смены"  />
        <el-table-column property="amount" label="Сумма смены"  />
        <el-table-column property="income" label="ЗП" />
    </el-table>
</template>

<style lang="css" scoped>
</style>