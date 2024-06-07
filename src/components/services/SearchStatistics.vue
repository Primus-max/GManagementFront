<script setup>
import {
  ref,
  watch,
} from 'vue';

const props = defineProps({
  searchType: {
    type: String,
    required: true
  },
  names: {
    type: Array,
    required: true
  }
});

const date = ref('');
const selectedName = ref('');

const updateDate = (newDate) => {
  date.value = newDate;
};

const updateSelectedName = (newName) => {
  selectedName.value = newName;
};

const fetchStatistics = () => {
  // Здесь можно вызвать метод для получения статистики в зависимости от типа поиска и выбранного имени
};
</script>

<template>
  <div class="search-statistics-wrapper">
    <div class="search-statistics">
      <p>Выбрать по:</p>
      <div class="picker date-picker">
        <p class="label-select">дате</p>
        <el-date-picker v-model="date" type="daterange" range-separator="||" start-placeholder="от"
          end-placeholder="до" @change="updateDate" />
      </div>
      <div class="picker name-picker">
        <p class="label-select">{{ searchType === 'operators' ? 'оператору' : searchType === 'girls' ? 'девушке' : 'клиенту' }}</p>
        <el-select v-model="selectedName" @change="updateSelectedName" :placeholder="`Выберите ${searchType === 'operators' ? 'оператора' : searchType === 'girls' ? 'девушку' : 'клиента'}`" >
          <el-option v-for="name in names" :key="name" :label="name" :value="name"  />
        </el-select>
      </div>
      <el-button type="primary" @click="fetchStatistics">Поиск</el-button>
    </div>
  </div>
</template>

<style scoped>
.search-statistics-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.search-statistics {
  width: 80%;
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

.name-picker {
  width: 300px;
}

.label-select {
  margin-right: 20px;
}
</style>
