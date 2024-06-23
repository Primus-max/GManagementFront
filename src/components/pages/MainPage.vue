<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import GroupStatistics from 'src/components/cards/GroupStatistics.vue';
import LoadingPage from 'src/components/services/LoadingPage.vue';
import OrderTable from 'src/components/tables/OrderTable.vue';
import { useGroupsStore } from 'src/stores/groupsStore';
import { useOrdersStore } from 'src/stores/ordersStore';

const ordersStore = useOrdersStore();
const groupsStore = useGroupsStore();

const groups = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  await groupsStore.fetchItems();
  groups.value = groupsStore.items;
  await ordersStore.getOrdersWidhDetails("grouped");
  isLoading.value = false;
});

const getOrdersByGroup = (groupId) => {
  return ordersStore.ordersWithDetails.filter(order => order.group === groupId);
};

const hasOrdersForGroup = (groupId) => {
  return ordersStore.ordersWithDetails.some(order => order.group === groupId);
};

</script>

<template> 

<LoadingPage :isLoading="isLoading" />

  <div class="page main-page" v-if="!isLoading">
    <div class="page-wrapper">
      <div class="groups">
        <div v-for="group in groups" :key="group.id">
          <template v-if="hasOrdersForGroup(group.id)">
            <h2 class="page-title">{{ group.name }}</h2>
            <div class="group-content">
              <GroupStatistics :orders="getOrdersByGroup(group.id)" />
              <el-card class="card-table">
              <OrderTable :orders="getOrdersByGroup(group.id)" />              
              </el-card>
            </div>
          </template>
        </div>
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

.page-wrapper .main-page {
  width: 100%;
}

.group-content {
  width: 100%;
  display: flex;
  flex-direction: row;  
}

.card-table {
  width: 100%;
}
</style>
