<script setup>
import {
  defineEmits,
  ref,
} from 'vue';

const emits = defineEmits('close'); 

const form = ref({
    username: '',
    password: '',
    group_id: '',
    balance: 0
  });
  
  const formLabelWidth = '100px';
  
  const loading = ref(false);
  
  const cancelForm = () => {
    // Сброс формы и закрытие модального окна
    form.value.username = '';
    form.value.password = '';
    form.value.group_id = '';
    form.value.balance = 0;
    emits('close');
  };
  
  const submitForm = () => {
    // Обработка отправки формы (вы можете добавить логику отправки на сервер)
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      cancelForm();
    }, 1500);
  };
  
</script>

<template>
    <el-form :model="form">
      <el-form-item label="Имя" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Пароль" :label-width="formLabelWidth">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Группа" :label-width="formLabelWidth">
        <el-input v-model="form.group_id" autocomplete="off" />
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
  