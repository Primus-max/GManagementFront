<script setup>
const props = defineProps({
  statistics: {
    type: Array,
    required: true
  }
});

const calculateOperatorPercentage = (income) => {
  const percentage = 0.07; // 7% оператора
  return income * percentage;
};

const calculateAdminPercentage = (income) => {
  const percentage = 0.05; // 5% администратора
  return income * percentage;
};

const calculateProfit = (income) => {
  const operatorPercentage = calculateOperatorPercentage(income);
  const adminPercentage = calculateAdminPercentage(income);
  return income - operatorPercentage - adminPercentage;
};
</script>

<template>
  <el-table :data="statistics" class="table" size="large" fit>    
    <el-table-column prop="client" label="Клиент" />
    <el-table-column prop="contact" label="TG" />
    <el-table-column prop="totalHours" label="Часы" />
    <!-- <el-table-column prop="leaves" label="Уходы"></el-table-column> -->
    <el-table-column prop="totalSpent" label="Доход" :formatter="(row) => row.totalSpent.toFixed(1) + ' ₽'" />
    <el-table-column prop="operatorPercentage" label="% Оператора" :formatter="(row) => calculateOperatorPercentage(row.totalSpent).toFixed(1) + ' ₽'"/>
    <el-table-column prop="totalAmount" label="Прибыль" :formatter="(row) => calculateProfit(row.totalSpent).toFixed(1) + ' ₽'" />
  </el-table>
</template>

<style scoped>
/* стили для компонента */
</style>
