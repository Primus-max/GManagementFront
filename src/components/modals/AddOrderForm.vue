<script setup>
import {
  onMounted,
  ref,
  watch,
} from 'vue';

import Order from 'src/models/Order';
import { useClientsStore } from 'src/stores/clientsStore';
import { useGirlsStore } from 'src/stores/girlsStore';
// import MessageService from '@/services/infoMessageService.js';
import { useOperatorsStore } from 'src/stores/operatorsStore';

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['close']);

const operatorsStore = useOperatorsStore();
const clientsStore = useClientsStore();
const girlsStore = useGirlsStore();
const operators = ref([]);
const clients = ref([]);
const girls = ref([]);
const orderTime = ref([]);
const form = ref({});
const formLabelWidth = '100px';
const loading = ref(false);


const resetForm = () => {
  form.value = { ...initialFormData };
};

const cancelForm = () => {
  resetForm();
  emits('close');
};

const initialFormData = {
  girlId: '',
  clientid: '',
  startTime: '',
  finishTime: '',
  amount: '',
  splitWithOperator: '',
  comment: '',
  isExtended: false,
  isEancelled: false,
}


onMounted(async () => {
  await clientsStore.fetchItems();
  await operatorsStore.fetchItems();
  await girlsStore.fetchItems();
  clients.value = clientsStore.items;
  operators.value = operatorsStore.items;
  girls.value = girlsStore.items;
});

watch(
  () => props.order,
  (newOrder) => {
    if (props.isEditing && newOrder) {
      form.value = { ...newOrder };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const submitForm = () => {
  loading.value = true;
  form.value.startTime = orderTime.value[0];
  form.value.finishTime = orderTime.value[1];
  const newOrder = {
    ...form.value,    
  }
};

const girlLabelSelect = (girl) => {
  return girl.name + "-" + girl.tgAcc;
}

const clientLabelSelect = (client) => {
  return client.name + "-" + (client.phone || client.tg);
}


</script>

<template>
  <el-form :model="form">
    <el-form-item label="Девушка" :label-width="formLabelWidth">
      <el-select v-model="form.girlId" placeholder="Выберите девушку">
        <template #label="{ label, value }">
          <span>{{ label }}: </span>
          <span style="font-weight: bold">{{ value }}</span>
        </template>
        <el-option v-for="girl in girls" :key="girl.id" :label="girlLabelSelect(girl)" :value="girl.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="Клиент" :label-width="formLabelWidth">
      <el-select v-model="form.clientId" placeholder="Выберите клиента" filterable>
        <template #label="{ label, value }">
          <span>{{ label }}: </span>
          <span style="font-weight: bold">{{ value }}</span>
        </template>
        <el-option v-for="client in clients" :key="client.id" :label="clientLabelSelect(client)" :value="client.id" />
      </el-select>
    </el-form-item>


    <el-form-item label="Время" :label-width="formLabelWidth">

      <el-time-picker v-model="orderTime" is-range format="HH:mm" placeholder="Выберите время"
        start-placeholder="Начало" end-placeholder="Конец" :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }" />

    </el-form-item>

    <el-form-item label="Сумма" :label-width="formLabelWidth">
      <el-input v-model="form.amount" type="number" autocomplete="off" />
    </el-form-item>

    <el-form-item label="Split %" :label-width="formLabelWidth">
      <el-select v-model="form.splitWithOperator" placeholder="Выберите оператора" filterable>
        <el-option v-for="operator in operators" :key="operator.id" :label="operator.name"
          :value="operator.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="Комментарий" :label-width="formLabelWidth">
      <el-input v-model="form.comment" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="form.isExtended">Продление</el-checkbox>
    </el-form-item>
    <!-- <el-form-item>
        <el-checkbox v-model="form.is_cancelled">Отмена</el-checkbox>
      </el-form-item> -->
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