<script setup>
import {
  onMounted,
  ref,
  watch,
} from 'vue';

import Order from '@/models/Order';
import { useClientsStore } from '@/stores/clientsStore';
import { useGirlsStore } from '@/stores/girlsStore';
// import MessageService from '@/services/infoMessageService.js';
import { useOperatorsStore } from '@/stores/operatorsStore';

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
  girl: '',
  clientName: '',
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
  const newOrder = {
    ...form.value,
  }

};
</script>

<template>
  <el-form :model="form">
    <el-form-item label="Девушка" :label-width="formLabelWidth">
      <el-select v-model="form.girl" placeholder="Выберите девушку">
        <el-option v-for="girl in girls" :key="girl.id" :label="girl.name" :value="girl.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Имя клиента" :label-width="formLabelWidth">
      <el-input v-model="form.clientName" autocomplete="off" />
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
      <el-select v-model="form.splitPercentage" placeholder="Выберите оператора">
        <el-option v-for="operator in operators" :key="operator.id" :label="operator.username"
          :value="operator.id"></el-option>
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