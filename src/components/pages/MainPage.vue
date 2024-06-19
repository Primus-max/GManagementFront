<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import OrderTable from 'src/components/tables/OrderTable.vue';
import { useGroupsStore } from 'src/stores/groupsStore';
import { useOrdersStore } from 'src/stores/ordersStore';

const ordersStore = useOrdersStore();
const groupsStore = useGroupsStore();

const groups = ref([]);

onMounted(async () => {
  await groupsStore.fetchItems();
  groups.value = groupsStore.items;
  await ordersStore.getOrdersWidhDetails("grouped");
});

const getOrdersByGroup = (groupId) => {
  return ordersStore.ordersWithDetails.filter(order => order.group === groupId);
};

// Функция для проверки, есть ли заказы для данной группы
const hasOrdersForGroup = (groupId) => {
  return ordersStore.ordersWithDetails.some(order => order.group === groupId);
};

</script>

<template>
  <div class="page main-page">
    <div class="page-wrapper">
      <div class="groups">
        <div v-for="group in groups" :key="group.id">
          <template v-if="hasOrdersForGroup(group.id)">
            <h2 class="page-title">{{ group.name }}</h2>
            <OrderTable :orders="getOrdersByGroup(group.id)" />
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

</style>
