<script setup>
import { ref } from 'vue';

import {
  useArchiveStatisticsStore,
} from 'src/stores/archiveStatisticsStore'; // Переименуйте этот стор, если необходимо

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['operators', 'girls'].includes(value)
    },
    names: {
        type: Array,
        required: true
    }
});

const archiveStore = useArchiveStatisticsStore();
const date = ref(archiveStore.date);
const operator = ref(archiveStore.operator);
const girl = ref(archiveStore.girl);
const amount = ref('');

const updateDate = (newDate) => {
    archiveStore.setDate(newDate);
};

const updateOperator = (newOperator) => {
    archiveStore.setOperator(newOperator);
};

const updateGirl = (newGirl) => {
    archiveStore.setGirl(newGirl);
};

const updateAmount = (newAmount) => {
    amount.value = newAmount;
};

const fetchStatistics = () => {
    archiveStore.fetchStatistics();
};
</script>

<template>
    <div class="search-archive-wrapper">
        <div class="search-archive">
            <p>Выбрать по:</p>

            <div class="picker date-picker">
                <p class="label-select">дате</p>
                <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
                    end-placeholder="до" @change="updateDate" />
            </div>

            <div class="picker operator-picker">
                <p class="label-select">оператору</p>
                <el-select v-model="operator" @change="updateOperator" placeholder="Выберите оператора">
                    <el-option v-for="name in names" :key="name" :label="name" :value="name" />
                </el-select>
            </div>

            <!-- <div class="picker girl-picker">
                <p class="label-select">девушке</p>
                <el-select v-model="girl" @change="updateGirl" placeholder="Выберите девушку">
                    <el-option v-for="name in names" :key="name" :label="name" :value="name" />
                </el-select>
            </div> -->

            <div class="picker amount-picker">
                <p class="label-select">сумме</p>
                <el-input v-model="amount" type="number" autocomplete="off" @change="updateAmount" />
            </div>

            <el-button type="primary" @click="fetchStatistics">Поиск</el-button>
        </div>
    </div>
</template>

<style scoped>
.search-archive-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.search-archive {
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.operator-picker {
    width: 300px;
}
.amount-picker{
    width: 200px;
}

.label-select {
    margin-right: 20px;
}
</style>
