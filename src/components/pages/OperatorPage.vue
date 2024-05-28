
<script setup>
import { ref } from 'vue';

import {
  ElCheckbox,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import AddOrderForm from '@/components/modals/AddOrderForm.vue';

// Пример данных
const balance = ref(5000); // Баланс оператора
const shiftTimeLeft = ref("02:30:00"); // Время до конца смены  
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
]);

const openBalanceModal = () => {
    // Логика открытия модального окна с информацией о балансе
    console.log('Открыть модальное окно с балансом');
};

const handleClose = () => {
    dialogVisible.value = false;
};


</script>

<template>
    <div class="operator-page">
        <div class="operator-page__wrapper">
            <!-- Header -->
            <header class="header">

                <el-button type="primary" @click="dialogVisible = true">
                    <i class="el-icon-plus"></i> Создать заказ
                </el-button>

                <div class="shift-time">
                    Время до конца смены: {{ shiftTimeLeft }}
                </div>


                <div class="balance" @click="openBalanceModal">
                    Баланс: {{ balance }} ₽
                </div>
            </header>

            <!-- Orders List -->
            <div class="orders-list">
                <h2>Текущая смена</h2>
                <el-table :data="orders" class="orders-table" size="large">
                    <el-table-column prop="id" label="ID" width="50"></el-table-column>
                    <el-table-column prop="girl" label="Девушка"></el-table-column>
                    <el-table-column prop="client_name" label="Имя клиента"></el-table-column>
                    <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
                    <el-table-column prop="split_with" label="Разделено с"></el-table-column>
                    <el-table-column prop="order_time" label="Время заказа"></el-table-column>
                    <el-table-column prop="is_extended" label="Прод-ие" width="100">
                        <template #default="{ row }">
                            <el-checkbox v-model="row.is_extended" disabled></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_cancelled" label="Отмена" width="100">
                        <template #default="{ row }">
                            <el-checkbox v-model="row.is_cancelled" disabled></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="comment" label="Комментарий"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>


    <el-drawer v-model="dialogVisible" title="Добавить заказ" :before-close="handleClose" direction="ltr">
        <AddOrderForm @close="dialogVisible = false" />
    </el-drawer>

</template>


<style lang="css" scoped>
.operator-page__wrapper {
    max-width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #555555;
    border-bottom: 1px solid #e0e0e0;
}

.balance {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.shift-time {
    font-size: 18px;
}

.orders-list {
    width: 100%;
    margin-top: 20px;
}

.orders-table {
    width: 100%;
}

/* .el-button {
    margin-top: 20px;
  } */
</style>