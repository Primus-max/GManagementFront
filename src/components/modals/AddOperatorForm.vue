<script setup>
import {
  ref,
  watch,
} from 'vue';

import Operator from '@/models/Operator';
import { useOperatorsStore } from '@/stores/operatorsStore';

const emits = defineEmits(['close']);
const operatorsStore = useOperatorsStore();

const props = defineProps({
  operator: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    required: true,
  }
});

const form = ref({});
const formLabelWidth = '100px';
const loading = ref(false);

const initialFormData = {
  name: '',
  login: '',
  password: '',
  groupId: 0,
};

// Инициализация формы
const resetForm = () => {
  form.value = { ...initialFormData };
};

// Обновление формы в зависимости от режима редактирования/добавления
watch(
  () => props.operator,
  (newOperator) => {
    if (props.isEditing && newOperator) {
      form.value = { ...newOperator };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const groups = ref([
  { value: 4, label: 'Group 1' },
  { value: 2, label: 'Group 2' },
]);

const cancelForm = () => {
  resetForm();
  emits('close');
};

const submitForm = async () => {
  loading.value = true;
  try {
    if (props.isEditing) {
      await operatorsStore.updateOperator(props.operator.id, { ...form.value });
    } else {
      const newOperator = new Operator({ ...form.value });
      await operatorsStore.addOperator(newOperator);
    }
    cancelForm();
  } catch (error) {
    console.error('Failed to submit form', error);
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
        <el-option v-for="group in groups" :key="group.value" :label="group.label" :value="group.value" />
      </el-select>
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
