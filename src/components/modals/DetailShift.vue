<script setup>
import OrderTable from 'src/components/tables/OrderTable.vue';

const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
});

console.log(props.orders);

</script>

<template>
    <div>
        <el-table :data="props.orders" class="table" size="large" fit height="60vh"
            default-sort="{ prop: 'id', order: 'descending' }">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="girl" label="Девушка"></el-table-column>
            <el-table-column prop="client" label="Клиент"></el-table-column>
            <el-table-column prop="amount" label="Сумма заказа" width="100"></el-table-column>
            <el-table-column prop="operator" label="Оператор"></el-table-column>
            <el-table-column prop="splitSalary" label="Split %" width="80"></el-table-column>
            <el-table-column prop="comment" label="Комментарий"></el-table-column>
        </el-table>
    </div>
</template>



<style lang="css" scoped>
</style>