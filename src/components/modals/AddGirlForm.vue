<template>
       <el-form :model="form">
      <el-form-item label="Имя" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>    
      <el-form-item label="Telegram" :label-width="formLabelWidth">
        <el-input v-model="form.group_id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Ссылка" :label-width="formLabelWidth">
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
  
  <script setup>
import {
  defineEmits,
  ref,
} from 'vue';

const visible = ref(false);
  const form = ref({
    name: '',
    telegram: ''
  });
  
  const formLabelWidth = '100px';
  const loading = ref(false);
  const emits = defineEmits(['close']);
  
  const handleClose = () => {
    visible.value = false;
  };
  
  const cancelForm = () => {
    form.value.name = '';
    form.value.telegram = '';
    emits('close');
  };
  
  const submitForm = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      cancelForm();
    }, 1500);
  };
  
</script>
  
  <style scoped>
  .drawer__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  </style>
  