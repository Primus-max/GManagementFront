<script setup>
import {
  defineProps,
  onMounted,
  ref,
  watchEffect,
} from 'vue';

import { ElMessageBox } from 'element-plus';
import Order from 'src/models/Order';
import ConfirmMessageServices
  from 'src/services/messageServices/confirmMessageServices';
import { useOrdersStore } from 'src/stores/ordersStore';
import { useShiftsStore } from 'src/stores/shiftsStore';

import { extendOrder } from '../../services/api/ordersRepos';

const props = defineProps({
  girls: {
    type: Array,
    required: true,
  },
  operators: {
    type: Array,
    required: true,
  },
  clients: {
    type: Array,
    required: true,
  },
  order: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
  isExtension: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(['close', 'order-added']);

const shiftsStore = useShiftsStore();
const ordersStore = useOrdersStore();

const form = ref({});
const orderTime = ref([]);
const loading = ref(false);
const formLabelWidth = '100px';

const resetForm = () => {
  form.value = { ...initialFormData };
};

const initialFormData = {
  girlId: '',
  clientId: '',
  groupId: '',
  startTime: '',
  finishTime: '',
  amount: '',
  splitWithOperator: '',
  comment: '',
  isExtended: false,
  isCancelled: false,
  isCashless: false,
};

watchEffect(() => {
  if (props.isEditing && props.order) {
    console.log(props.order);
    if (props.isExtension) {
      form.value.girlId = props.order.girl;
      form.value.clientId = props.order.client;
      form.value.splitWithOperator = props.order.splitOperator;
      form.value.isExtended = props.order.isExtended;
      form.value.isCashless = props.order.isCashless;
    }
  } else {
    resetForm();
  }
});

const cancelForm = () => {
  resetForm();
  emits('close');
};

const submitForm = async () => {
  if (!shiftsStore.currentShift) {
    ConfirmMessageServices.info('Для создания заказа, необходимо начать смену').then(() => {
      loading.value = false;
      emits('close');
    });
    return;
  }

  const me = JSON.parse(localStorage.getItem('me'));
  if (me.id === form.value.splitWithOperator) {
    await ConfirmMessageServices.info('Нельзя делить процент с самим собой');
    return;
  }

  loading.value = true;
  form.value.startTime = orderTime.value[0];
  form.value.finishTime = orderTime.value[1];
  form.value.shiftId = shiftsStore.currentShift.id;
  form.value.groupId = me.groupId;

  const newOrder = {
    ...form.value,
    girl: form.value.girl ? form.value.girl : undefined,
    client: form.value.client ? form.value.client : undefined,
  };

  try {
    if (props.isExtension) {
      await extOrder();
    } else {
      await ordersStore.addOrder(new Order(newOrder));
    }
    cancelForm();
    loading.value = false;
    emits('order-added');
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    loading.value = false;
  }
};

const girlLabelSelect = (girl) => {
  return `${girl.name} - ${girl.tgAcc}`;
};

const clientLabelSelect = (client) => {
  return `${client.name} - ${client.phone || client.tg}`;
};

onMounted(() => {
  resetForm();
});

const extOrder = async () => {
  try {
    const orderExtensionData = {
      id: props.order.id,
      startTime: form.value.startTime,
      finishTime: form.value.finishTime,
      amount: form.value.amount,
      isCashless: form.value.isCashless,
      comment: form.value.comment,
    };
    await ordersStore.extendOrder(orderExtensionData);    
  } catch (error) {
    console.error('Error extending order:', error);    
  }
};

</script>

<template>
  <el-form :model="form">
    <el-form-item label="Девушка" :label-width="formLabelWidth">
      <el-select v-model="form.girlId" placeholder="Выберите девушку" :disabled="props.isExtension">
        <el-option v-for="girl in props.girls" :key="girl.id" :label="girlLabelSelect(girl)" :value="girl.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="Клиент" :label-width="formLabelWidth">
      <el-select v-model="form.clientId" placeholder="Выберите клиента" filterable :disabled="props.isExtension">
        <el-option v-for="client in props.clients" :key="client.id" :label="clientLabelSelect(client)"
          :value="client.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="Время" :label-width="formLabelWidth">
      <el-time-picker v-model="orderTime" is-range format="HH:mm" placeholder="Выберите время"
        start-placeholder="Начало" end-placeholder="Конец"
        :picker-options="{ selectableRange: '00:00:00 - 23:59:59' }" />
    </el-form-item>

    <el-form-item label="Сумма" :label-width="formLabelWidth">
      <el-input v-model="form.amount" type="number" autocomplete="off"  />
    </el-form-item>

    <el-form-item label="Split %" :label-width="formLabelWidth">
      <el-select v-model="form.splitWithOperator" placeholder="Выберите оператора" filterable clearable
        :disabled="props.isExtension">
        <el-option v-for="operator in props.operators" :key="operator.id" :label="operator.name" :value="operator.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="Комментарий" :label-width="formLabelWidth">
      <el-input v-model="form.comment" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="form.isExtended" :checked="props.isExtension">Продление</el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="form.isCashless">Б/Н</el-checkbox>
    </el-form-item>

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
