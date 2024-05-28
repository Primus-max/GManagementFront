<template>
    <div class="main-page">
        <div class="page-wrapper">
            <Header >
                <h1 class="page-title">Текущие заказы</h1>
            </Header>
            <el-table :data="orders" class="table" size="large">
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="girl" label="Девушка"></el-table-column>
                <el-table-column prop="client_name" label="Клиент"></el-table-column>
                <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
                <el-table-column prop="split_percentage" label="Split %"></el-table-column>
                <el-table-column prop="comment" label="Комментарий"></el-table-column>
                <el-table-column label="Действия">
                    <template v-slot="scope">
                        <el-checkbox aria-readonly="true" v-model="scope.row.is_extended" disabled>Продление</el-checkbox>
                        <el-checkbox v-model="scope.row.is_cancelled" disabled>Отмена</el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const orders = ref([
    { id: 1, girl: 'Девушка1', client_name: 'Клиент1', amount: 100, split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
    { id: 2, girl: 'Девушка2', client_name: 'Клиент2', amount: 200, split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
    // Здесь добавьте начальные данные заказов
]);  
</script>

<style scoped>


</style>