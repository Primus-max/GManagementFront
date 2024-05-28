<script setup>
import { ref } from 'vue';

import { ElDrawer } from 'element-plus';

import AddGirlForm from '@/components/modals/AddGirlForm.vue';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

const dialogVisible = ref(false);

const girls = ref([
  { id: 1, name: 'Girl1', telegram: '@girl1' },
  { id: 2, name: 'Girl2', telegram: '@girl2' }
]);

const handleClose = () => {
  dialogVisible.value = false;
};

const editGirl = (girl) => {
  console.log('Редактировать девушку:', girl);
};

const deleteGirl = (girl) => {
  console.log('Удалить девушку:', girl);
};
</script>

<template>
  <div class="girls-page">
    <div class="girls-page__wrapper">
      <div class="table-wrapper">
        <el-button type="primary" @click="dialogVisible = true">
          <i class="el-icon-plus"></i> Добавить девушку
        </el-button>

        <el-drawer v-model="dialogVisible" title="Добавить девушку" :before-close="handleClose" direction="ltr">
          <AddGirlForm @close="dialogVisible = false" />
        </el-drawer>

        <el-table :data="girls" class="girls-table" size="large" highlight-current-row="true">
          <el-table-column prop="id" label="ID" width="100px"></el-table-column>
          <el-table-column prop="name" label="Имя"></el-table-column>
          <el-table-column prop="telegram" label="Телеграмм аккаунт"></el-table-column>
          <el-table-column label="Действия" width="120">
            <template #default="{ row }">
              <el-button type="text" class="control-button" :icon="Edit" @click="editGirl(row)"></el-button>
              <el-button type="text" class="control-button" :icon="Delete" @click="deleteGirl(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import '@/assets/styles/main.css';

.girls-page__wrapper {
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

.girls-table {
  width: 100%;
  margin-top: 20px;
}

/* .el-button {
  margin-top: 20px;
} */

</style>
