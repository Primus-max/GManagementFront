<script setup>
import { computed } from 'vue';

import { useOrdersStore } from 'src/stores/ordersStore';

const ordersStore = useOrdersStore();
const orders = computed(() => {
  return ordersStore.ordersWithDetails.slice().reverse();
});


const cancelOrder = (order) => {
    // логика отмены заказа
};

const extendOrder = (order) => {
    // логика продления заказа
};

const editOrder = (order) => {
    // логика редактирования заказа
};

const deleteOrder = (order) => {
    // логика удаления заказа
};

const payOrder = (order) => {
    // логика выплаты заказа
};
</script>


<template>
    <div class="order-table">
        <el-table :data="orders" class="table" size="large" fit height="60vh" default-sort="{ prop: 'id', order: 'descending' }">
            <el-table-column prop="id" label="ID" width="50" ></el-table-column>
            <el-table-column prop="girl" label="Девушка"></el-table-column>
            <el-table-column prop="client" label="Клиент"></el-table-column>
            <el-table-column prop="amount" label="Сумма заказа" width="100"></el-table-column>
            <el-table-column prop="operator" label="Оператор"></el-table-column>
            <el-table-column prop="splitPercentage" label="Split %" width="80"></el-table-column>
            <el-table-column prop="comment" label="Комментарий"></el-table-column>           
        </el-table>
    </div>
</template>

<style scoped>
@import 'src/assets/styles/main.css';
.table {
  max-height: 60vh; /* Установите нужную высоту */
  overflow: auto; /* Включение прокрутки */
}

</style>