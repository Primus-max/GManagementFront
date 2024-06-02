<script setup>
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const operatorsProps = defineProps({
    operators: {
        type: Array,
        required: true
    }
})


const editOperator = (operator) => {
    console.log('Редактировать оператора:', operator);
};

const deleteOperator = (operator) => {
    console.log('Удалить оператора:', operator);
};
</script>

<template>
    <div class="table-wrapper">
        <el-table :data="operators" class="table" size="large">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="username" label="Имя"></el-table-column>
            <el-table-column prop="group_id" label="Группа"></el-table-column>
            <el-table-column prop="balance" label="Баланс"></el-table-column>
            <el-table-column label="Действия" width="120">
                <template #default="{ row }">
                    <el-button type="text" class="control-button" :icon="Edit" @click="editOperator(row)"></el-button>
                    <el-button type="text" class="control-button" :icon="Delete"
                        @click="deleteOperator(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/main.css';
</style>