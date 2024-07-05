<script setup>
import {
  computed,
  ref,
} from 'vue';

import AddOrderForm from 'src/components/modals/AddOrderForm.vue';

import {
  Clock,
  Close,
  Delete,
  Edit,
  EditPen,
  Scissor,
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
const openModeAddOrderForm = ref('');

const editOrder = (order, mode) => {
    dialogFormVisible.value = true;
    orderEdit.value = order;
    openModeAddOrderForm.value = mode;
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

const rowClassName = ({ row }) => {
    let className = '';
    if (row.isExtended) className += 'extended-order ';
    if (row.isCancelled || row.isClientHasLeft) className += 'cancelled-order ';
    return className.trim();
}

const labelAction = (row) => {
    if (row.isCancelled) return 'Отменён';
    if (row.isClientHasLeft) return 'Уход';
}

</script>


<template>
    <el-table :data="hierarchicalOrders" row-key="id" :tree-props="{ children: 'children' }"
        :row-class-name="rowClassName">
        <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
        <el-table-column prop="girl" label="Девушка" />
        <el-table-column prop="client" label="Клиент" />
        <el-table-column prop="orderTime" label="Время" />
        <el-table-column prop="amount" label="Сумма заказа" />
        <el-table-column prop="operator" label="Оператор" />
        <el-table-column prop="splitOperator" label="Разделил с" />
        <el-table-column prop="comment" label="Комментарий" />
        <el-table-column label="Действия" align="center" v-if="isOperator">
            <template #default="{ row }">

                <p v-if="row.isCancelled || row.isClientHasLeft" class="label-action">{{ labelAction(row) }}</p>

                <el-tooltip content="Редактировать / продлить" placement="top">
                    <el-button type="text" class="control-button" :icon="Clock" @click="editOrder(row, 'isExtension')"
                        v-if="!row.isCancelled && !row.isClientHasLeft" />
                </el-tooltip>

                <el-tooltip content="Отмена заказа" placement="top">
                    <el-button type="text" class="control-button error-button" :icon="Close"
                        @click="editOrder(row, 'isCancel')" v-if="!row.isCancelled && !row.isClientHasLeft" />
                </el-tooltip>

                <el-tooltip content="Уход клиента" placement="top">
                    <el-button type="text" class="control-button error-button" :icon="Scissor"
                        @click="editOrder(row, 'isClientHasLeft')" v-if="!row.isCancelled && !row.isClientHasLeft" />
                </el-tooltip>

            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="dialogFormVisible" title="Продлить заказ" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" :order="orderEdit" :isEditing="true"
            :openModeAddOrderForm="openModeAddOrderForm" :girls="girls" :clients="clients" />
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

.el-table .cancelled-order {
    background-color: #f78989;
}

.error-button {
    color: red;
}

.label-action {
    margin: 0;
    padding: 0;
}
</style>