<script setup>
import {
  reactive,
  ref,
} from 'vue';

import {
  ElCheckbox,
  ElMessage,
  ElMessageBox,
  ElTable,
  ElTableColumn,
} from 'element-plus';

import AddOrderForm from '@/components/modals/AddOrderForm.vue';
import OrderTable from '@/components/tables/OrderTable.vue';

// Пример данных
const balance = ref(5000); // Баланс оператора
const dialogVisible = ref(false);

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

// Пример данных заказов
const orders = ref([
    {
        id: 1,
        girl: 'Анна',
        client_name: 'Иван',
        amount: 3000,
        split_with: 'Оператор1',
        order_time: '12:00 - 14:00',
        is_extended: false,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
    {
        id: 2,
        girl: 'Мария',
        client_name: 'Петр',
        amount: 2000,
        split_with: 'Оператор2',
        order_time: '15:00 - 16:00',
        is_extended: true,
        is_cancelled: false,
        comment: 'Комментарий к заказу',
    },
]);


const shiftStartTime = ref("08:00"); // Начало смены
const shiftEndTime = ref("16:00"); // Конец смены
const shiftTimeLeft = ref("02:30:00"); // Время до конца смены
// const openBalanceModal = () => {
//     ElMessageBox.alert('This is a message', 'Информация о балансе', {
//     // if you want to disable its autofocus
//     // autofocus: false,
//     confirmButtonText: 'OK',
//     // callback: (action) => {
//     //   ElMessage({
//     //     type: 'info',
//     //     message: `action: ${action}`,
//     //   })
//     // },
//   })
// };
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})

const gridData = [
    {
        date: '2016-05-02',
        order: 234,
        client: 'Валера',
    },
    {
        date: '2016-05-04',
        order: 248,
        client: 'John Smith',
    },
    {
        date: '2016-05-01',
        order: 122,
        client: 'Андрей Борсивич',
    },
    {
        date: '2016-05-03',
        order: 301,
        client: 'John Smith',
    },
]


const girls = ref([
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Мария' },
    { id: 3, name: 'Екатерина' },
    // Другие девушки...
]);


const options = [
  {
    value: 'Option1',
    label: 'Label1',
  },
  {
    value: 'Option2',
    label: 'Label2',
  },
  {
    value: 'Option3',
    label: 'Label3',
  },
  {
    value: 'Option4',
    label: 'Label4',
  },
  {
    value: 'Option5',
    label: 'Label5',
  },
]

const handleClose = () => {
    dialogVisible.value = false;
};

</script>

<template>
    <div class="page operator-page">


        <el-card class="summary">
            <div class="summary-wrapper">
                <div class="summary-item"><b> За смену </b>: {{ balance }} ₽</div>
                <div class="summary-item">Безнал: {{ balance }} ₽</div>
                <div class="summary-item">Моя З/П: {{ balance }} ₽</div>
                <div class="summary-item">Split З/П: {{ balance }} ₽</div>
            </div>
        </el-card>

        <div class="page-wrapper">
            <el-card>
                <!-- Header -->
                <header class="page-header ">

                    <el-button type="primary" @click="dialogVisible = true">
                        <i class="el-icon-plus"></i> Создать заказ
                    </el-button>

                    <div class="girls-select">
                        <el-select v-model="selectedGirls" placeholder="Выберите девушек" style="width: 240px" clearable multiple>
    <template #label="{ name }">
        <span>{{ name }}</span>
    </template>
    <el-option v-for="girl in girls" :key="girl.id" :label="girl.name" :value="girl.id" />
</el-select>

                    </div>

                    <div class="shift-time-wrapper">
                        <el-popover placement="top-start" title="Информация о смене" width="200" trigger="hover">
                            <template #reference>
                                <el-button class="popover-button">Смена</el-button>
                            </template>
                            <div class="shift-info">
                                <div>Начало: {{ shiftStartTime }}</div>
                                <div>Конец: {{ shiftEndTime }}</div>
                            </div>
                        </el-popover>
                        <div>осталось: {{ shiftTimeLeft }}</div>
                    </div>
                    <el-button class="balance-button" plain @click="dialogTableVisible = true">
                        Баланс: {{ balance }} ₽
                    </el-button>
                </header>

                <!-- Orders List -->
                <div class="orders-list">
                    <OrderTable :orders="orders" />
                </div>
            </el-card>
        </div>
    </div>

    <el-drawer v-model="dialogVisible" title="Добавить заказ" :before-close="handleClose" direction="ltr">
        <AddOrderForm @close="dialogVisible = false" />
    </el-drawer>

    <el-dialog v-model="dialogTableVisible" title="Информация о формировании баланса" width="800">
        <el-table :data="gridData">
            <el-table-column property="date" label="Дата" width="150" />
            <el-table-column property="order" label="Заказ" width="200" />
            <el-table-column property="client" label="Клиент" />
        </el-table>
    </el-dialog>

</template>


<style lang="css" scoped>
@import '@/assets/styles/main.css';

.operator-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
}

.summary {
    margin-top: 20px;
    min-height: 240px;
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.summary-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.page-header {
    width: auto;
    padding-top: 0;
}

.balance {
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.shift-time-wrapper {
    width: 18%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.popover-button,
.balance-button {
    background-color: rgb(235, 235, 235);
}

.girls-select {
    width: 18%;
}

/* .shift-time {
    font-size: 18px;
} */
/* 
.orders-list {
    width: 100%;
    margin-top: 20px;
} */
</style>