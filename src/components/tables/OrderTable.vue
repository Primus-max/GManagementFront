<script setup>
import {
  computed,
  ref,
} from 'vue';

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
    }
});

const dialogFormVisible = ref(false);
const orderEdit = ref(null);
const isOperator = computed(() => props.tableType === 'operator');

const editOrder = (order) => {
    dialogFormVisible.value = true;
    orderEdit.value = order;
};

const createOrderHierarchy = (orders) => {
    const orderMap = {};
    const roots = [];

    // Создаем словарь заказов
    orders.forEach(order => {
        orderMap[order.id] = { ...order, children: [] };
    });

    // Создаем иерархическую структуру
    orders.forEach(order => {
        if (order.extendedOrderId !== -1 && orderMap[order.extendedOrderId]) {
            orderMap[order.extendedOrderId].children.push(orderMap[order.id]);
        } else {
            roots.push(orderMap[order.id]);
        }
    });

    return roots;
};

const hierarchicalOrders = computed(() => createOrderHierarchy(props.orders));

const extendedOrder = ({ row }) =>
    row.isExtended ? 'extended-order' : '';

</script>


<template>
    <el-table :data="hierarchicalOrders" row-key="id"  :tree-props="{ children: 'children' }"
        :row-class-name="extendedOrder" >
        <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
        <el-table-column prop="girl" label="Девушка" />
        <el-table-column prop="client" label="Клиент" />
        <el-table-column prop="orderTime" label="Время" />
        <el-table-column prop="amount" label="Сумма заказа" />
        <el-table-column prop="operator" label="Оператор" />
        <el-table-column prop="splitPercentage" label="Split %"  />
        <el-table-column prop="comment" label="Комментарий" />
        <el-table-column label="Продлить"  align="center" v-if="isOperator">
            <template #default="{ row }">
                <el-tooltip content="Редактировать / продлить" placement="top">
                    <el-button type="text" class="control-button" :icon="Edit" @click="editOrder(row)" />
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="dialogFormVisible" title="Продлить заказ" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" :order="orderEdit" :isEditing="true" :isExtension="true"
            :girls="girls" :clients="clients" />
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
  background-color: rgb(238, 238, 238);
}
</style>