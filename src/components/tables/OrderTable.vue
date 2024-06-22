<script setup>
import { ref } from 'vue';

import AddOrderForm from 'src/components/modals/AddOrderForm.vue';

import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const props = defineProps({
    orders: {
        type: Array,
        required: true
    },
    tableType: {
        type: String,
        required: false
    },
    girls: {
        type: Array,
        required: false
    },
    clients: {
        type: Array,
        required: false
    },

})

const dialogFormVisible = ref(false);
const orderEdit = ref(null);
const isOperator = props.tableType === 'operator';

const editOrder = (order) => {
    dialogFormVisible.value = true;
    orderEdit.value = order;
}

const tableRowClassName = ({ row }) => 
    row.isExtended ?   'extended-order': '';

</script>


<template>
  
        <el-table :data="props.orders" class="table" size="large" fit
            :default-sort="{ prop: 'id', order: 'descending' }" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="girl" label="Девушка"></el-table-column>
            <el-table-column prop="client" label="Клиент"></el-table-column>
            <el-table-column prop="amount" label="Сумма заказа" width="100"></el-table-column>
            <el-table-column prop="operator" label="Оператор"></el-table-column>
            <el-table-column prop="splitPercentage" label="Split %" width="80"></el-table-column>
            <el-table-column prop="comment" label="Комментарий"></el-table-column>
            <el-table-column label="Продлить" width="120" align="center" v-if="isOperator">
                <template #default="{ row }">
                    <el-tooltip content="Редактировать / продлить" placement="top">
                        <el-button type="text" class="control-button" :icon="Edit" @click="editOrder(row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
   


    <el-drawer v-model="dialogFormVisible" title="Продлить заказ" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" :order="orderEdit" :isEditing="true" :isExtension="true"
            :girls="props.girls" :clients="props.clients" />
    </el-drawer>

</template>

<style lang="css">
@import 'src/assets/styles/main.css';

.table {
    width: 100%;
    max-height: 60vh;
    overflow: auto;
}

.el-table .extended-order {   
    background-color: var(--el-color-success-light-9);
}
</style>