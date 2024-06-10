<script setup>
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/tooltip/style/css';
import 'element-plus/es/components/table/style/css';

import { ref } from 'vue';

import {
  ElMessage,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import OrderTable from 'src/components/tables/OrderTable.vue';

// import MessageService from '@/services/infoMessageService.js';
import {
  Check,
  Close,
  Delete,
  Edit,
  Money,
} from '@element-plus/icons-vue';

// const orders = ref([
//     { id: 1, girl: 'Девушка1', client_name: 'Клиент1', amount: 100, operator: 'Оператор1', split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
//     { id: 2, girl: 'Девушка2', client_name: 'Клиент2', amount: 200, operator: 'Оператор2', split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
// ]);


const groups = ref([]);

groups.value = [
        {
            name: 'Группа 1.0',
            orders: [
                { id: 1, girl: 'Anna', client_name: 'John Doe', amount: 100, operator: 'Operator 1', split_percentage: 50, comment: 'No comment' },
                // другие заказы группы 1.0
            ]
        },
        {
            name: 'Группа 2.0',
            orders: [
                { id: 2, girl: 'Bella', client_name: 'Jane Doe', amount: 200, operator: 'Operator 2', split_percentage: 60, comment: 'No comment' },
                // другие заказы группы 2.0
            ]
        }
        // другие группы
    ];
// const editOrder = (order) => {
//     MessageService.info(`Редактировать заказ: ${order.id}`);
// };

// const deleteOrder = (order) => {
//     MessageService.info(`Удалить заказ: ${order.id}`);
// };

// const cancelOrder = (order) => {
//     MessageService.info(`Отмена заказа: ${order.id}`);
// };

// const extendOrder = (order) => {
//     MessageService.info(`Продление заказа: ${order.id}`);
// };

// const payOrder = (order) => {
//     MessageService.info(`Выплата заказа: ${order.id}`);
// };

</script>

<template>
    <div class="page main-page">
        <div class="page-wrapper">           
            <div class="groups" v-for="group in groups" :key="group.name">
                <h2 class="page-title">{{ group.name }}</h2>
                <OrderTable :orders="group.orders" />
            </div>
        </div>
    </div>
</template>
<style scoped>
@import 'src/assets/styles/main.css';

.page-title {
    margin: 0;
    padding: 0;
    font-size: 24px;
}




.groups {
    margin-top: 30px;
}




/* @media screen and (min-width: 768px) {
  .table {
    flex: 1 1 50%;
  }
}

@media screen and (min-width: 1024px) {
  .table {
    flex: 1 1 33.33%;
  }
} */
</style>