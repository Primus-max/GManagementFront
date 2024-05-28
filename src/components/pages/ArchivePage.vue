<script setup>
import { ref } from 'vue';

import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const orders = ref([
    { id: 1, girl: 'Девушка1', client_name: 'Клиент1', amount: 100, split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
    { id: 2, girl: 'Девушка2', client_name: 'Клиент2', amount: 200, split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
    // Здесь добавьте начальные данные заказов
]);

const editOrder = (order) => {
    // Логика редактирования заказа
    console.log('Редактировать заказ', order);
};

const deleteOrder = (order) => {
    // Логика удаления заказа
    console.log('Удалить заказ', order);
};

</script>

<template>
    <div class="archive-page">
        <div class="page-wrapper">
            <Header class="page-header">
                <div class="page-header__wrapper">

                    <p>Выбрать по:</p>

                    <div class="date-picker">
                        <p class="label-select">дате</p><el-date-picker />
                    </div>

                    <div class="date-picker">
                        <p class="label-select">оператору</p>
                        <el-select v-model="operator" placeholder="Выберите оператора" />
                    </div>

                    <div class="date-picker">
                        <p class="label-select">девушке</p>
                        <el-select v-model="operator" placeholder="Выберите оператора" />
                    </div>

                    <div class="date-picker">
                        <p class="label-select">сумме</p>
                        <el-input v-model="amount" type="number" autocomplete="off" />
                    </div>

                </div>
            </Header>
            <h1 class="page-title">Архив</h1>
            <el-table :data="orders" class="table" size="large">
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="girl" label="Девушка"></el-table-column>
                <el-table-column prop="client_name" label="Клиент"></el-table-column>
                <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
                <el-table-column prop="split_percentage" label="Split %"></el-table-column>
                <el-table-column prop="comment" label="Комментарий"></el-table-column>
                <el-table-column label="Действия">
                    <template v-slot="scope">

                        <el-checkbox v-model="scope.row.is_extended" disabled class="custom-checkbox"></el-checkbox>
                        <el-checkbox v-model="scope.row.is_cancelled" disabled class="custom-checkbox"></el-checkbox>

                        <el-button type="text" class="control-button" :icon=Edit
                            @click="editOrder(scope.row)"></el-button>
                        <el-button type="text" class="control-button" :icon=Delete
                            @click="deleteOrder(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/styles/main.css';

.page-header__wrapper {
    width: 100%;
    height: 40px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.date-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}

.label-select {
    margin: 0 20px 0 20px;
}
</style>