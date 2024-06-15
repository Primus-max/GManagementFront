<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';

import { useShiftsStore } from 'src/stores/shiftsStore';

const shiftsStore = useShiftsStore();
const dialogVisible = ref(false);

// // Загружаем данные при первом открытии
// onMounted(async () => {
//   await loadUnpaidShifts();
// });

// // Следим за изменением видимости модального окна
// watch(() => dialogVisible.value, async (newValue) => {
//   if (newValue) {
//     await loadUnpaidShifts();
//   }
// });

// const loadUnpaidShifts = async () => {
//   await shiftsStore.getUnpaidShifts();
// };

const formattedUnpaidShifts = computed(() => {
  return shiftsStore.unpaidShifts.map(shift => ({
    ...shift,
    date: formatDate(shift.date),
    amount: shift.amount.toFixed(1) + ' ₽',
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
    <el-table-column property="date" label="Дата смены" />
    <el-table-column property="amount" label="Сумма смены" />
    <el-table-column property="income" label="ЗП" />
  </el-table>
</template>

<style scoped>
/* Ваши стили */
</style>
