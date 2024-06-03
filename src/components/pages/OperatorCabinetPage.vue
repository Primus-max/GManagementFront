<script setup>
import { ref } from 'vue';

import {
  ElCheckbox,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import AddOrderForm from '@/components/modals/AddOrderForm.vue';
import OrderTable from '@/components/tables/OrderTable.vue';

// Пример данных
const balance = ref(5000); // Баланс оператора

const dialogVisible = ref(false);

// Пример данных заказов
const orders = ref([
    {
        id: 1,
        girl: 'Анна',
        client_name: 'Иван',
        amount: 3000,
        split_with: 'Оператор1',
        order_time: '12:00 - 14:00',
        is_extended: false,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
]);


const shiftStartTime = ref("08:00"); // Начало смены
const shiftEndTime = ref("16:00"); // Конец смены
const shiftTimeLeft = ref("02:30:00"); // Время до конца смены
const openBalanceModal = () => {
    // Логика открытия модального окна с информацией о балансе
    console.log('Открыть модальное окно с балансом');
};

const handleClose = () => {
    dialogVisible.value = false;
};


</script>

<template>
    <div class="page operator-page">


        <el-card class="summary">
            <div class="summary-wrapper">
                <div class="summary-item"><b> За смену </b>: {{ balance }} ₽</div>
                <div class="summary-item">Безнал: {{ balance }} ₽</div>
                <div class="summary-item">Моя З/П: {{ balance }} ₽</div>
                <div class="summary-item">Split З/П: {{ balance }} ₽</div>
            </div>
        </el-card>

        <div class="page-wrapper">
            <el-card>
                <!-- Header -->
                <header class="page-header ">

                    <el-button type="primary" @click="dialogVisible = true">
                        <i class="el-icon-plus"></i> Создать заказ
                    </el-button>


                    <el-button type="primary" >
                        Девушки в смену
                    </el-button>

                    <div class="shift-time-wrapper">
                    <el-popover placement="top-start" title="Информация о смене" width="200" trigger="hover">
                        <template #reference>
                            <el-button class="popover-button">Смена</el-button>
                        </template>
                        <div class="shift-info">
                            <div>Начало: {{ shiftStartTime }}</div>
                            <div>Конец: {{ shiftEndTime }}</div>
                        </div>
                    </el-popover>
                    <div>осталось: {{ shiftTimeLeft }}</div>
                </div>
                    <div class="balance" @click="openBalanceModal">
                        Баланс: {{ balance }} ₽
                    </div>
                </header>

                <!-- Orders List -->
                <div class="orders-list">
                    <OrderTable :orders="orders" />
                </div>
            </el-card>
        </div>
    </div>

    <el-drawer v-model="dialogVisible" title="Добавить заказ" :before-close="handleClose" direction="ltr">
        <AddOrderForm @close="dialogVisible = false" />
    </el-drawer>

</template>


<style lang="css" scoped>
@import '@/assets/styles/main.css';

.operator-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
}

.summary {
    margin-top: 20px;
    min-height: 240px;
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.summary-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.page-header {
    width: auto;
}

.balance {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.shift-time-wrapper {
    width: 18%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.popover-button {
    background-color: rgb(235, 235, 235);
}

/* .shift-time {
    font-size: 18px;
} */
/* 
.orders-list {
    width: 100%;
    margin-top: 20px;
} */
</style>