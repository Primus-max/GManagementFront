<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import { PAGE_ITEMS_LIMIT } from 'src/constants';

const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  users: {
    type: Array,
    required: true
  },
  searchType: {
    type: String,
    required: true
  }
});

const date = ref(null);
const selectedUser = ref(null);

// Обновление даты
const updateDate = (value) => {
  date.value = value;
};

// Обновление оператора
const updateUser = (value) => {
  selectedUser.value = value;
};

// Поиск
const search = async () => {
  const searchParams = {
    startDate: date.value ? date.value[0] : null,
    endDate: date.value ? date.value[1] : null,
    limit: PAGE_ITEMS_LIMIT,
    offset: 0,
    user: selectedUser.value,
  };

  await props.store.searchItems(searchParams);
};

const reset = async () => {
  await props.store.resetPagination();
  date.value = null;
  selectedUser.value = null;
}

const searchType = () => {
  switch (props.searchType) {
    case "girls": return "девушкам"
    case "operators": return "операторам"
    case "clients": return "клиентам"
  }
}

const lableSelect = (user) => {
  if (props.searchType == "girls") {
    return user.name + "-" + user.tgAcc;
  }
  return user.name;
}
</script>


<template>
  <div class="search-archive-wrapper">
    <div class="search-archive">
      <p>Выбрать по:</p>

      <div class="picker date-picker">
        <p class="label-select">дате</p>
        <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от" end-placeholder="до"
          @change="updateDate" clearable />
      </div>

      <div class="picker operator-picker">
        <p class="label-select">{{ searchType() }}</p>
        <el-select v-model="selectedUser" @change="updateUser" placeholder="Выберите" clearable filterable>
          <template #label="{ label, value }">
            <span>{{ label }}: </span>
            <span>{{ lableSelect(value) }}</span>
          </template>
          <el-option v-for="user in users" :key="user.id" :label="lableSelect(user)" :value="user.id" />
        </el-select>
      </div>

      <div class="control-buttons">
        <el-button type="primary" @click="search">Поиск</el-button>
        <el-button @click="reset">Сбросить</el-button>
      </div>

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

.amount-picker {
  width: 200px;
}

.label-select {
  margin-right: 20px;
}
</style>