<script setup>
import {
  ref,
  watch,
} from 'vue';

import Client from 'src/models/Client';
// import MessageService from '@/services/infoMessageService';
import { useClientsStore } from 'src/stores/clientsStore';

const props = defineProps({
  client: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['close']);
const clientsStore = useClientsStore();
const formLabelWidth = '100px';
const loading = ref(false);
const form = ref({});

const initialFormData = {
  name: 'Александр',
  tg: '@alexander',
  phone: '+7 999 999 99 99',
};

const resetForm = () => {
  form.value = { ...initialFormData };
};


watch(
  () => props.client,
  (newClient) => {
    if (props.isEditing && newClient)
      form.value = { ...newClient };
    else
      resetForm();
  },
  { immediate: true }
);


const cancelForm = () => {
  resetForm();
  emits('close');
};


const submitForm = () => { 
  loading.value = true;

  const client = {
      ...form.value      
    };

  if (props.isEditing) {
    clientsStore.updateItem(client);
  } else {
    clientsStore.addItem(new Client(client));
  }
  
  cancelForm();
  loading.value = false; 
};

</script>

<template>
  <el-form :model="form">
    <el-form-item label="Имя" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="on" />
    </el-form-item>

    <el-form-item label="Телеграм" :label-width="formLabelWidth">
      <el-input v-model="form.tg" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Телефон" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off" />
    </el-form-item>

    <!-- <el-form-item label="Бонусы" :label-width="formLabelWidth">
        <el-input v-model="form.bonus" type="number" autocomplete="off" />
      </el-form-item> -->

    <div class="drawer__footer">
      <el-button @click="cancelForm">Отмена</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        {{ loading ? 'Отправка ...' : (props.isEditing ? 'Редактировать' : 'Добавить') }}
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