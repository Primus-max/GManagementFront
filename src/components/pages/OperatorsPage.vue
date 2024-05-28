<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddOperatorForm from '@/components/modals/AddOperatorForm.vue';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const dialogVisible = ref(false);

const operators = ref([
  { id: 1, username: 'Operator1', group_id: 'Group1', balance: 100 },
  { id: 2, username: 'Operator2', group_id: 'Group2', balance: 200 }
]);

const handleClose = () => {
  dialogVisible.value = false;
};

const editOperator = (operator) => {
  console.log('Редактировать оператора:', operator);
};

const deleteOperator = (operator) => {
  console.log('Удалить оператора:', operator);
};
</script>

<template>
  <div class="operators-page">
    <div class="operators-page__wrapper">
      <div class="table-wrapper">
        <el-button type="primary" @click="dialogVisible = true">
          <i class="el-icon-plus"></i> Добавить оператора
        </el-button>

        <el-drawer v-model="dialogVisible" title="Добавить оператора" :before-close="handleClose" direction="ltr">
          <AddOperatorForm @close="dialogVisible = false" />
        </el-drawer>

        <el-table :data="operators" class="operators-table" size="large">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="username" label="Имя"></el-table-column>
          <el-table-column prop="group_id" label="Группа"></el-table-column>
          <el-table-column prop="balance" label="Баланс"></el-table-column>
          <el-table-column label="Действия" width="120">
            <template #default="{ row }">
              <el-button type="text" class="control-button" :icon="Edit" @click="editOperator(row)"></el-button>
              <el-button type="text" class="control-button" :icon="Delete" @click="deleteOperator(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import '@/assets/styles/main.css';
.operators-page__wrapper {
    max-width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

.table-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.operators-table {
  display: flex;
  margin-top: 20px;
}

.el-table {
  margin-top: 20px;
}


</style>
