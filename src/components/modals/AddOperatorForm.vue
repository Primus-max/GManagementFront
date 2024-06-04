<script setup>
import {
  defineEmits,
  ref,
} from 'vue';

import { useOperatorsStore } from '@/stores/operatorsStore';

const emits = defineEmits(['close']);
const operatorsStore = useOperatorsStore();

const form = ref({
  name: '',
  login: '',
  password: '',
  groupId: '',
  balance: 0,
});

const formLabelWidth = '100px';
const loading = ref(false);

const cancelForm = () => {
  form.value = {
    name: '',
    login:'',
    password: '',
    groupId: '',
    balance: 0,
  };
  emits('close');
};

const groups = ref([
  { value: 'Group1', label: 'Group 1' },
  { value: 'Group2', label: 'Group 2' },
  // Добавьте здесь другие группы
]);

const submitForm = async () => {
  loading.value = true;
  try {
    const newOperator = { ...form.value };
    // Добавляем оператора в хранилище
    await operatorsStore.addOperator(newOperator);
    cancelForm();
  } catch (error) {
    console.error('Failed to add operator', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <el-form :model="form">
    <el-form-item label="Имя" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Логин" :label-width="formLabelWidth">
      <el-input v-model="form.login" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Пароль" :label-width="formLabelWidth">
      <el-input v-model="form.password" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Группа" :label-width="formLabelWidth">
      <el-select v-model="form.groupId" placeholder="Выберите группу">
        <el-option
          v-for="group in groups"
          :key="group.value"
          :label="group.label"
          :value="group.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Баланс" :label-width="formLabelWidth">
      <el-input v-model="form.balance" type="number" autocomplete="off" />
    </el-form-item>

    <div class="drawer__footer">
      <el-button @click="cancelForm">Отмена</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        {{ loading ? 'Отправка ...' : 'Добавить' }}
      </el-button>
    </div>
  </el-form>
</template>

<style scoped>
.drawer__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
