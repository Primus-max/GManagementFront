<script setup>
import { computed } from 'vue';

const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
});

const totalAmount = computed(() => props.orders.reduce((sum, order) => sum + order.amount, 0));
const operatorSalary = computed(() => {
      return props.orders
        .filter(order => !order.isCancelled && !order.isClientHasLeft) 
        .reduce((sum, order) => sum + order.mySalary, 0); 
    });
const total = computed(() => totalAmount.value + operatorSalary.value);

</script>

<template>
    <div class="group-statistics">
        <el-card class="summary">
            <div class="summary-wrapper">
                <div class="summary-item"><b> За смену </b>: {{ totalAmount.toFixed(1) }} ₽</div>
                <!-- <div class="summary-item"><b>Безнал </b>: {{ ordersStore.getCashlessAmount.toFixed(1) }} ₽</div> -->
                <div class="summary-item"><b> З/П операторов </b>:{{ operatorSalary.toFixed(1) }} ₽</div>
                <div class="summary-item"><b>Итого </b>: {{ total.toFixed(1) }} ₽</div>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.group-statistics {    
    margin-right: 20px;
}

.summary {   
    min-height: 200px;
    max-width: 280px;
    width: 250px;
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
</style>