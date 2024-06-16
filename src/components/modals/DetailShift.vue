<script setup>
import { ref } from 'vue';

import AddOrderForm from 'src/components/modals/AddOrderForm.vue';
import OrderTable from 'src/components/tables/OrderTable.vue';

const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
});

const dialogFormVisible = ref(false);
const editOrder = ref(null);
// console.log(props.orders);

const handleEditOrder = (order) => {
    console.log('Order to edit:', order);
    dialogFormVisible.value = true;
    editOrder.value = order;    
};
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
            <el-table-column prop="comment" label="Коммент"></el-table-column>

            <el-table-column label="Действия" align="center">
                <template v-slot="scope">
                    <div class="control-buttons-wrapper">
                        <el-tooltip placement="top" content="Редактировать заказ">
                            <el-button class="control-button" type="text" @click="handleEditOrder(scope.row)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip placement="top" content="Удалить заказ">
                            <el-button class="control-button" type="text" @click="deleteOrder(scope.row)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>

        </el-table>
    </div>


    <!-- Edit Order Form -->
    <el-drawer v-model="dialogFormVisible" title="Редактировать заказ" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" :order="editOrder" :isEditing="true" />
    </el-drawer>

</template>



<style lang="css" scoped>
@import 'src/assets/styles/main.css';
</style>