<script setup>
const props = defineProps({
  statistics: {
    type: Array,
    required: true
  },
  girls: {
    type: Array,
    required: true
  }
});

const getGirlName = (id) => {
  return props.girls.find((girl) => girl.id === id).name
}
const getGirlTg = (id) => {
  return props.girls.find((girl) => girl.id === id).tgAcc
}

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
    <el-table-column prop="username" label="Девушка" :formatter="(row) => getGirlName(row.girl)" />
    <el-table-column prop="username" label="TG" :formatter="(row) => getGirlTg(row.girl)"/>
    <el-table-column prop="totalOrders" label="Смены" />
    <el-table-column prop="totalHours" label="Часы" />
    <el-table-column prop="totalGuests" label="Гости" />
    <!-- <el-table-column prop="t" label="Уходы"></el-table-column> -->
    <el-table-column prop="totalIncome" label="Доход" :formatter="(row) => row.totalIncome.toFixed(2) + ' ₽'"/>
    <el-table-column prop="username" label="% Оператора" :formatter="(row) => calculateOperatorPercentage(row.totalIncome).toFixed(2) + ' ₽'"/>
    <el-table-column prop="totalAmount" label="Прибыль" width="100"  :formatter="(row) => calculateProfit(row.totalIncome).toFixed(2) + ' ₽'"/>
  </el-table>
</template>

<style scoped>
/* стили для компонента */
</style>
