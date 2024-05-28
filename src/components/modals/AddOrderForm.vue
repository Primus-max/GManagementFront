<template>

    <el-form :model="form">
        <el-form-item label="Девушка" :label-width="formLabelWidth">
      <el-select v-model="form.girl" placeholder="Выберите девушку">
        <el-option
          v-for="girl in girls"
          :key="girl.id"
          :label="girl.name"
          :value="girl.id"
        ></el-option>
      </el-select>
    </el-form-item>

      <el-form-item label="Имя клиента" :label-width="formLabelWidth">
        <el-input v-model="form.client_name" autocomplete="off" />
      </el-form-item>


      <el-form-item label="Время" :label-width="formLabelWidth">
      <el-time-picker
        v-model="form.order_time"
        is-range
        format="HH:mm"
        placeholder="Выберите время"
        start-placeholder="Начало"
        end-placeholder="Конец"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59' // Возможно изменение доступного диапазона времени
        }"
      />
    </el-form-item>

      <el-form-item label="Сумма" :label-width="formLabelWidth">
        <el-input v-model="form.amount" type="number" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Split %" :label-width="formLabelWidth">
      <el-select v-model="form.split_operator" placeholder="Выберите оператора">
        <el-option
          v-for="operator in operators"
          :key="operator.id"
          :label="operator.username"
          :value="operator.id"
        ></el-option>
      </el-select>
    </el-form-item>

      <el-form-item label="Комментарий" :label-width="formLabelWidth">
        <el-input v-model="form.comment" autocomplete="off" />
      </el-form-item>

      <el-form-item>        
        <el-checkbox v-model="form.is_extended">Продление</el-checkbox>
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
  
  <script setup>
import {
  defineEmits,
  ref,
} from 'vue';

const emits = defineEmits('close');
  
  const form = ref({
    girl: '',
    client_name: '',
    order_time: '',
    amount: '',
    split_percentage: '',
    comment: '',
    is_extended: false,
    is_cancelled: false
  });
  
  const formLabelWidth = '100px';
  
  const loading = ref(false);
  
  const cancelForm = () => {
    // Сброс формы и закрытие модального окна
    form.value.girl = '';
    form.value.client_name = '';
    form.value.amount = '';
    form.value.split_percentage = '';
    form.value.comment = '';
    form.value.is_extended = false;
    form.value.is_cancelled = false;
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
  
  const operators = ref([
  { id: 1, username: 'Оператор1' },
  { id: 2, username: 'Оператор2' },
  // Здесь будут ваши операторы
]);
  
const girls = ref([
  { id: 1, name: 'Девушка1' },
  { id: 2, name: 'Девушка2' },
  // Здесь будут ваши девушки
]);
</script>
  
  <style scoped>
  .drawer__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  </style>
  