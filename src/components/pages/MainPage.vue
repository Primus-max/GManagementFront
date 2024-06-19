<script setup>
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/tooltip/style/css';
import 'element-plus/es/components/table/style/css';

import {
  computed,
  onMounted,
  ref,
} from 'vue';

import {
  ElMessage,
  ElTable,
  ElTableColumn,
} from 'element-plus';
import OrderTable from 'src/components/tables/OrderTable.vue';
import { useOrdersStore } from 'src/stores/ordersStore';

// import MessageService from '@/services/infoMessageService.js';
import {
  Check,
  Close,
  Delete,
  Edit,
  Money,
} from '@element-plus/icons-vue';

const ordersStore = useOrdersStore();

onMounted( async() => {
  await ordersStore.getOrdersWithDetails("grouped");
})

const orders = computed(() => {
  return ordersStore.ordersWithDetails.slice().reverse();
});

</script>

<template>
    <div class="page main-page">
        <div class="page-wrapper">           
            <div class="groups" v-for="group in groups" :key="group.name">
                <h2 class="page-title">{{ group.name }}</h2>
                <OrderTable :orders="orders" />
            </div>
        </div>
    </div>
</template>
<style scoped>
@import 'src/assets/styles/main.css';

.page-title {
    margin: 0;
    padding: 0;
    font-size: 24px;
}

.groups {
    margin-top: 30px;
}

</style>