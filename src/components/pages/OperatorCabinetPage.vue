<script setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from 'vue';

import {
  ElCheckbox,
  ElMessage,
  ElMessageBox,
  ElPopover,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import AddOrderForm from 'src/components/modals/AddOrderForm.vue';
import DetailOperatorBalance
  from 'src/components/modals/DetailOperatorBalance.vue';
import OrderTable from 'src/components/tables/OrderTable.vue';
import OperationIntent from 'src/models/enums/OperationIntent';
import Shift from 'src/models/Shift.js';
import MessageService from 'src/services/messageServices/infoMessageService';
import { useClientsStore } from 'src/stores/clientsStore';
import { useGirlsStore } from 'src/stores/girlsStore';
import { useOperatorsStore } from 'src/stores/operatorsStore';
import { useOrdersStore } from 'src/stores/ordersStore';
import { useShiftsStore } from 'src/stores/shiftsStore';
import { formatTime } from 'src/utils/formatters';
import {
  shiftTimeLeft,
  startShiftCountdown,
} from 'src/utils/shiftUtils';

const operatorsStore = useOperatorsStore();
const girlsStore = useGirlsStore();
const shiftsStore = useShiftsStore();
const ordersStore = useOrdersStore();
const clientsStore = useClientsStore();
const dialogFormVisible = ref(false)
const balance = ref(0);
const orderDialogVisible = ref(false);
const detailBalancedialogVisible = ref(false)
const selectedGirls = ref([]);
const clients = ref([]);
const orders = ref([]);
const unpaidShifts = ref([]);
const isCurrentShiftExists = ref(false);
const isLoading = ref(true);
const formLabelWidth = '140px'


onBeforeMount(async () => {
    try {
       await updateBalance();

        await shiftsStore.fetchCurrentShift();
        if (shiftsStore.currentShift) {
            await startShiftCountdown(shiftsStore.currentShift.end, handleShiftEnd);
            shiftState(true, false);
            return;
        } else shiftState(false, false);
    } catch (error) {
        console.log('Нет текущих смен');
        shiftState(false, false);
    }
});

onMounted(async () => {
    await clientsStore.fetchItems();
    await girlsStore.fetchItems();
    await operatorsStore.fetchItems();
    await ordersStore.getOrdersWidhDetails();
    orders.value = ordersStore.ordersWithDetails;
    clients.value = clientsStore.items;
    selectedGirls.value = await girlsStore.getGirlsFromGroup();
    operators.value = operatorsStore.items;
});

const girls = computed(() => girlsStore.items);
const operators = computed(() => operatorsStore.items);

const shiftStartTime = ref(new Date().setHours(10, 0, 0));
const shiftEndTime = ref(new Date().setHours(21, 0, 0));
// const shiftTimeLeft = ref("02:30:00");

const girlLabelSelect = (girl) => {
    return girl.name + "-" + girl.tgAcc;
}

const addGirlsToGroup = async () => {
    await girlsStore.addGirlsToGroup(selectedGirls.value);
}

const startShift = async () => {
    if (shiftsStore.currentShift) return;

    const me = JSON.parse(localStorage.getItem('me'));

    const shift = new Shift({
        ...me,
        start: new Date(shiftStartTime.value).toISOString(),
        end: new Date(shiftEndTime.value).toISOString(),
    });

    const shiftId = await shiftsStore.startShift(shift);
    shift.id = shiftId;
    shiftsStore.currentShift = shift;
    await startShiftCountdown(shiftsStore.currentShift.end, handleShiftEnd);
    shiftState(true, true);
}

const handleShiftEnd = () => {
    ElMessageBox.confirm('Смена закончилась', 'Подтвердите действие', {
        confirmButtonText: 'Ок',
        type: 'info',
        showCancelButton: false
    }).then(async () => {
        shiftState(false, false);
        await shiftsStore.stopShift(shiftsStore.currentShift.id);
    })
};

const shiftState = (exests, loading) => {
    isCurrentShiftExists.value = exests;
    isLoading.value = loading;
}

const updateBalance = async () => {
    const me = await operatorsStore.getMe();
    operatorsStore.operatotBalance = me.balance;
    balance.value = operatorsStore.operatotBalance
}
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
                            clearable multiple class="girls-select" :reserve-keyword="true">
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

                    <div v-if="!isLoading && !isCurrentShiftExists">
                        <el-button type="primary" @click="startShift"> Начать смену</el-button>
                    </div>

                    <div class="shift-time-wrapper">
                        <el-popover placement="top-start" title="Информация о смене" width="200" trigger="hover">
                            <template #reference>
                                <el-button class="popover-button">Смена</el-button>
                            </template>
                            <div class="shift-info">
                                <div>Начало: {{ formatTime(shiftStartTime) }}</div>
                                <div>Конец: {{ formatTime(shiftEndTime) }}</div>
                            </div>
                        </el-popover>
                        <div>осталось: {{ shiftTimeLeft }}</div>
                    </div>
                    <el-button class="balance-button" plain @click="detailBalancedialogVisible = true">
                        Баланс: {{ balance.toFixed(1) }} ₽
                    </el-button>
                </header>

                <!-- Orders List -->
                <div class="orders-list">
                    <OrderTable />
                </div>
            </el-card>
        </div>
    </div>

    <el-drawer v-model="dialogFormVisible" title="Добавить заказ" direction="ltr">
        <AddOrderForm @close="dialogFormVisible = false" @order-added="updateBalance" :clients="clients" :operators="operators"
            :girls="selectedGirls" :isEditing="false" />
    </el-drawer>

    <el-dialog v-model="detailBalancedialogVisible" title="Информация о формировании баланса" width="800">
        <DetailOperatorBalance @close="detailBalancedialogVisible = false" :unpaidShifts="unpaidShifts" />     
    </el-dialog>

</template>


<style lang="css" scoped>
@import 'src/assets/styles/main.css';

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

</style>
