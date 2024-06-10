<script setup>
import {
  computed,
  onMounted,
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
import OperationIntent from '@/models/enums/OperationIntent';
import { useGirlsStore } from '@/stores/girlsStore';
import { useOperatorsStore } from '@/stores/operatorsStore';

const operatorsStore = useOperatorsStore();
const girlsStore = useGirlsStore();
const dialogFormVisible = ref(false)
const balance = ref(5000);
const orderDialogVisible = ref(false);
const detailBalancedialogVisible = ref(false)
const selectedGirls = ref([]);
const formLabelWidth = '140px'


const operators = ref([]);

onMounted(async () => {
    await girlsStore.fetchItems();
    selectedGirls.value = await girlsStore.getGirlsFromGroup();  
    await operatorsStore.fetchItems();
    operators.value = operatorsStore.items;
    //await fetchGirls();
});

const girls = computed(() => girlsStore.items);

// const fetchGirls = async () => {
//   const sql = 'SELECT * FROM "Girls"';
//   const parameters = [];

//   const queryModel = {
//     Intent: OperationIntent.GetGirlsByGroupId, // Указываем намерение запроса
//     Sql: sql,
//     Parameters: parameters,
//   };

//   try {
//     const response = await girlsStore.executeFromSql(queryModel); // Отправляем запрос
//     console.log('Girls:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching girls:', error);
//     throw error;
//   }
// };


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


const girlLabelSelect = (girl) => {
    return girl.name + "-" + girl.tgAcc;
}

const addGirlsToGroup = async () => {
    await girlsStore.addGirlsToGroup(selectedGirls.value);    
}


const handleClose = () => {
    orderDialogVisible.value = false;
};

</script>

<template>
    <div class="page operator-page">

        <div class="left-cards">
            <el-card class="summary">
                <div class="summary-wrapper">
                    <div class="summary-item"><b> За смену </b>: {{ balance }} ₽</div>
                    <div class="summary-item">Безнал: {{ balance }} ₽</div>
                    <div class="summary-item">Моя З/П: {{ balance }} ₽</div>
                    <div class="summary-item">Split З/П: {{ balance }} ₽</div>
                </div>
            </el-card>

            <el-card class="girls-in-shift">
                <div class="girls-in-shift-wrapper">
                    <div>
                        <el-select v-model="selectedGirls" placeholder="Выбрать девушек в смену" style="width: 240px"
                            clearable multiple class="girls-select" :reserve-keyword="true" >
                            <!-- <template #select>
                                <div class="el-select__selected-item">
                                    {{ selectedGirls.length }}
                                </div>
                            </template> -->
                            <template #label="{ label, value }">
                                <span>{{ label }}: </span>
                                <span style="font-weight: bold">{{ value }}</span>
                            </template>
                            <el-option v-for="girl in girls" :key="girl.id" :label="girlLabelSelect(girl)"
                                :value="girl.id" />
                        </el-select>
                    </div>
                    <div class="select-girl-button">
                        <el-button type="primary" size="small" @click="addGirlsToGroup">Добавить</el-button>
                    </div>
                </div>
            </el-card>
        </div>

        <div class="page-wrapper">
            <el-card>
                <!-- Header -->
                <header class="page-header">

                    <el-button type="primary" @click="dialogFormVisible = true">
                        Создать заказ
                    </el-button>
                    <div>
                        <el-button type="primary" @click="testAdd"> Начать смену</el-button>

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

    <el-drawer v-model="dialogFormVisible" title="Добавить заказ" :before-close="handleClose" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" />
    </el-drawer>

    <el-dialog v-model="detailBalancedialogVisible" title="Информация о формировании баланса" width="800">
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

.left-cards {
    width: 280px;
    display: flex;
    flex-direction: column;
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

.girls-in-shift {
    margin-top: 20px;
    height: auto;
    max-height: 240px;
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.select-girl-button {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.page-header {
    width: auto;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    align-items: center;
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
