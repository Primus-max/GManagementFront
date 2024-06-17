<script setup>
import { ref } from 'vue';

import DetailShift from 'src/components/modals/DetailShift.vue';
import { useShiftsStore } from 'src/stores/shiftsStore';
import { formatDate } from 'src/utils/formatters';

import {
  Check,
  Close,
} from '@element-plus/icons-vue';

const props = defineProps({
    shifts: {
        type: Array,
        required: true
    }
});

const shiftsStore = useShiftsStore();
const detailShiftDialogVisible = ref(false);
const orders = ref([]);

const cancelOrder = (order) => {
    // логика отмены заказа
};

const extendOrder = (order) => {
    // логика продления заказа
};

const editOrder = (order) => {
    // логика редактирования заказа
};

const deleteOrder = (order) => {

};

const payOrder = async (order) => {
    await shiftsStore.payShift(order.id);
};

const viewDetailShift = (shift) => {
    detailShiftDialogVisible.value = true;    
    orders.value = shift.orders;
}
</script>

<template>
    <el-table :data="shifts" class="table" size="large" @cell-dblclick="viewDetailShift" >
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="operatorName" label="Оператор" align="center"></el-table-column>
        <el-table-column label="Дата" align="center">
            <template v-slot="scope">
                {{ formatDate(scope.row.start) }}
            </template>
        </el-table-column>
        <el-table-column label="Выплачено" align="center">
            <template v-slot="scope">
                <el-icon v-if="scope.row.isPaid" class="paid-icon">
                    <Check />
                </el-icon>
                <el-icon v-else class="not-paid-icon">
                    <Close />
                </el-icon>
            </template>
        </el-table-column>
        <el-table-column label="Действия" align="center" width="400">
            <template v-slot="scope">

                <div class="control-buttons-wrapper">                   
                    <el-tooltip placement="top" content="Удалить смену">
                        <el-button class="control-button" type="text" @click="deleteOrder(scope.row)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip placement="top" content="Выплатить">
                        <el-button class="control-button" type="text" @click="payOrder(scope.row)">
                            <el-icon>
                                <Money />
                            </el-icon>
                        </el-button>
                    </el-tooltip>
                </div>

            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="detailShiftDialogVisible" title="Информация о формировании смены" width="800">
        <DetailShift :orders="orders" />
    </el-dialog>
</template>



<style scoped>
@import 'src/assets/styles/main.css';

.paid-icon {
    color: green;
    font-size: large;
}

.not-paid-icon {
    color: red;
    font-size: large;
}
</style>