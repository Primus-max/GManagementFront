<script setup>
import { ref } from 'vue';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const emits = defineEmits(['editOperator']);
const operatorsProps = defineProps({
    operators: {
        type: Array,
        required: true
    }
})

const dialogVisible = ref(false);
const editingOperator = ref(null);

const editOperator = (operator) => { 
      dialogVisible.value = true;
      editingOperator.value = operator;
   // emits('editOperator', operator);
};

const deleteOperator = (operator) => {
    console.log('Удалить оператора:', operator);
};
</script>

<template>
    <div class="table-wrapper">
        <el-table :data="operators" class="table" size="large">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="Имя"></el-table-column>
            <el-table-column prop="login" label="Логин"></el-table-column>
            <el-table-column prop="groupId" label="Группа"></el-table-column>
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

    <el-drawer v-model="dialogVisible" title="Редактировать оператора"  direction="ltr">
    <AddOperatorForm @close="dialogVisible = false" :operator="editingOperator" :isEditing="true" />
  </el-drawer>


</template>

<style lang="css" scoped>
@import '@/assets/styles/main.css';
</style>