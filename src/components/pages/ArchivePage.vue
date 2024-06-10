<script setup>
import { ref } from 'vue';

import SearchArchive from 'src/components/services/SearchArchive.vue';
import ArchiveTable from 'src/components/tables/ArchiveTable.vue';

import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const orders = ref([
    { id: 1, operator: 'оператор1', client_name: 'Клиент1', status: 'Оплачен', split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
    { id: 2, operator: 'оператор2', client_name: 'Клиент2', status: 'Не оплачен', split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
    // Здесь добавьте начальные данные заказов
]);

const activeTab = ref('operators');

const editOrder = (order) => {
    // Логика редактирования заказа
    console.log('Редактировать заказ', order);
};

const deleteOrder = (order) => {
    // Логика удаления заказа
    console.log('Удалить заказ', order);
};

</script>

<template>
    <div class="page archive-page">
      <div class="page-wrapper">
        <el-card>
          <el-tabs v-model="activeTab" tab-position="left" >
            <el-tab-pane label="Операторы" name="operators">
                <div class="search-header-wrapper">
              <SearchArchive type="operators" :names="['Operator1', 'Operator2']" />
            </div>
              <ArchiveTable :orders="orders" />
            </el-tab-pane>
            <el-tab-pane label="Девушки" name="girls" disabled>
              <SearchArchive type="girls" :names="['Girl1', 'Girl2']" />
              <ArchiveTable :orders="orders" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </template>
<style scoped>
@import 'src/assets/styles/main.css';
.page-header-wrapper {
    width: 100%;
    height: 40px;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.date-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}

.label-select {
    margin: 0 20px 0 20px;
}
</style>