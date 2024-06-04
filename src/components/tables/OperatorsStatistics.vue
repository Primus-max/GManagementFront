<script setup>
const props = defineProps({
    statistics: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <el-table :data="statistics" class="table" size="large" fit>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="username" label="Оператор"></el-table-column>
        <el-table-column prop="username" label="Группа"></el-table-column>
        <el-table-column prop="totalOrders" label="Касса/О"></el-table-column>
        <el-table-column prop="totalAmount" label="Касса/Ч" width="100"></el-table-column>
        <el-table-column prop="totalAmount" label="ЗП" width="100"></el-table-column>
        <el-table-column prop="totalAmount" label="Касса-ЗП" width="100"></el-table-column>
        <el-table-column prop="totalAmount" label="- 5% Админ" width="100"></el-table-column>
        <el-table-column prop="totalAmount" label="Итого" width="100"></el-table-column>
    </el-table>
</template>



<style scoped>
/* стили для компонента */
</style>