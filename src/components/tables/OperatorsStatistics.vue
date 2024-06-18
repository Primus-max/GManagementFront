<script setup>
import { computed } from 'vue';

const props = defineProps({
    statistics: {
        type: Array,
        required: true
    }
});

const processedStatistics = computed(() => {
    return props.statistics.map(stat => {
        const totalIncome = stat.totalIncome;
        const operatorSalary = totalIncome * 0.07;
        const adminFee = (totalIncome - operatorSalary) * 0.05;
        const netIncome = totalIncome - operatorSalary - adminFee;

        return {
            ...stat,
            totalIncome: totalIncome.toFixed(2) + ' ₽',
            operatorSalary: operatorSalary.toFixed(2) + ' ₽',
            adminFee: adminFee.toFixed(2) + ' ₽', 
            netIncome: netIncome.toFixed(2) + ' ₽',
            pureIncome: (totalIncome - operatorSalary).toFixed(2) + ' ₽',
            incomeAfterOperatorSalary: (totalIncome - operatorSalary).toFixed(2) + ' ₽',
        };
    });
});
</script>


<template>
    <el-table :data="processedStatistics" class="table" size="large" fit>       
        <el-table-column prop="operator" label="Оператор"></el-table-column>        
        <el-table-column prop="totalIncome" label="Касса/О"></el-table-column>
        <el-table-column prop="pureIncome" label="Касса/Ч" ></el-table-column>
        <el-table-column prop="operatorSalary" label="ЗП" ></el-table-column>
        <el-table-column prop="incomeAfterOperatorSalary" label="Касса - ЗП" ></el-table-column>
        <el-table-column prop="adminFee" label="- 5% Админ" ></el-table-column>
        <el-table-column prop="netIncome" label="Итого" ></el-table-column>
    </el-table>
</template>

<style scoped>
/* стили для компонента */
.table {
    width: 100%;
}
</style>
