<script setup>
import {
  defineEmits,
  ref,
} from 'vue';

const emits = defineEmits('close'); 

const form = ref({
    clientName: '',
    telegram: '',
    phone: '',
    bonus: 0
  });
  
  const formLabelWidth = '100px';
  
  const loading = ref(false);
  
  const cancelForm = () => {
    // Сброс формы и закрытие модального окна
    form.value.clientName = '';
    form.value.telegram = '';
    form.value.phone = '';
    form.value.bonus = 0;
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
        <el-input v-model="form.clientName" autocomplete="on" />
      </el-form-item>

      <el-form-item label="Телеграм" :label-width="formLabelWidth">
        <el-input v-model="form.tg"  autocomplete="off" />
      </el-form-item>

      <el-form-item label="Телефон" :label-width="formLabelWidth">
        <el-input v-model="form.phone"  autocomplete="off" />
    </el-form-item>

      <el-form-item label="Бонусы" :label-width="formLabelWidth">
        <el-input v-model="form.bonus" type="number" autocomplete="off" />
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
  