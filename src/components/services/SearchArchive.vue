<script setup>
import { ref } from 'vue';

import {
  useArchiveStatisticsStore,
} from '@/stores/archiveStatisticsStore'; // Переименуйте этот стор, если необходимо

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
    searchStore.setDate(newDate);
};

const updateOperator = (newOperator) => {
    searchStore.setOperator(newOperator);
};

const updateGirl = (newGirl) => {
    searchStore.setGirl(newGirl);
};

const updateAmount = (newAmount) => {
    amount.value = newAmount;
};

const fetchStatistics = () => {
    searchStore.fetchStatistics();
};
</script>

<template>
    <div class="search-archive">
        <p>Выбрать по:</p>

        <div class="filter-item">
            <p class="label-select">дате</p>
            <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
                end-placeholder="до" @change="updateDate" />
        </div>

        <div class="filter-item">
            <p class="label-select">оператору</p>
            <el-select v-model="operator" @change="updateOperator" placeholder="Выберите оператора">
                <el-option v-for="name in names" :key="name" :label="name" :value="name" />
            </el-select>
        </div>

        <div class="filter-item">
            <p class="label-select">девушке</p>
            <el-select v-model="girl" @change="updateGirl" placeholder="Выберите девушку">
                <el-option v-for="name in names" :key="name" :label="name" :value="name" />
            </el-select>
        </div>

        <div class="filter-item">
            <p class="label-select">сумме</p>
            <el-input v-model="amount" type="number" autocomplete="off" @change="updateAmount" />
        </div>

        <el-button type="primary" @click="fetchStatistics">Поиск</el-button>
    </div>
</template>

<style scoped>
.search-archive {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.filter-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.label-select {
    margin-bottom: 5px;
}
</style>
