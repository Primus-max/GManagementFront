<script setup>
const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
});

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
    // логика удаления заказа
};

const payOrder = (order) => {
    // логика выплаты заказа
};
</script>


<template>
    <div class="order-table">
        <el-table :data="orders" class="table" size="large" fit height="60vh">
            <el-table-column prop="id" label="ID" width="50" ></el-table-column>
            <el-table-column prop="girl" label="Девушка"></el-table-column>
            <el-table-column prop="client_name" label="Клиент"></el-table-column>
            <el-table-column prop="amount" label="Сумма заказа" width="100"></el-table-column>
            <el-table-column prop="operator" label="Оператор"></el-table-column>
            <el-table-column prop="split_percentage" label="Split %" width="80"></el-table-column>
            <el-table-column prop="comment" label="Комментарий"></el-table-column>
            <!-- <el-table-column label="Действия">
                <template v-slot="scope">
                    <div class="control-buttons-wrapper">
                        <el-tooltip placement="left" content="Отмена">
                            <el-button class="control-button" type="text" @click="cancelOrder(scope.row)">
                                <el-icon>
                                    <Close />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip placement="left" content="Продление">
                            <el-button class="control-button" type="text" @click="extendOrder(scope.row)">
                                <el-icon>
                                    <Check />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip placement="left" content="Редактировать">
                            <el-button class="control-button" type="text" @click="editOrder(scope.row)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip placement="left" content="Удалить">
                            <el-button class="control-button" type="text" @click="deleteOrder(scope.row)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip placement="left" content="Выплата">
                            <el-button class="control-button" type="text" @click="payOrder(scope.row)">
                                <el-icon>
                                    <Money />
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<style scoped>
@import '@/assets/styles/main.css';
.table {
  max-height: 60vh; /* Установите нужную высоту */
  overflow: auto; /* Включение прокрутки */
}

</style>