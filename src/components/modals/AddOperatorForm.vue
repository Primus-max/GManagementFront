<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';

import Operator from '@/models/Operator';
import { useGroupsStore } from '@/stores/groupsStore';
import { useOperatorsStore } from '@/stores/operatorsStore';

const emits = defineEmits(['close']);
const operatorsStore = useOperatorsStore();
const groupsStore = useGroupsStore();
const form = ref({});
const formLabelWidth = '100px';
const loading = ref(false);


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

onMounted(async () => {
  await groupsStore.fetchItems();
});

const initialFormData = {
  name: '',
  login: '',
  password: '',
  id: null,
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

const cancelForm = () => {
  resetForm();
  emits('close');
};

const submitForm = async () => {
  loading.value = true;
  try {
    if (props.isEditing) {
      await operatorsStore.updateItem({ ...form.value });
    } else {
      const newOperator = new Operator({ ...form.value });
      await operatorsStore.addItem(newOperator);
    }
    cancelForm();
  } catch (error) {
    console.error('Failed to submit form', error);
  } finally {
    loading.value = false;
  }
};

const groups = computed(() => groupsStore.items);

const deleteGroup = () => {
  console.log(form.value.groupId);
  groupsStore.deleteItem(form.value);  
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
      <el-select v-model="form.id" placeholder="Выберите группу или создайте новую" filterable allow-create
        @create="addGroup">
        <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id" />
        <template #footer>
          <el-button type="danger" v-if="groups.length > 0" @click="deleteGroup" text bg
            size="small">Удалить</el-button>
        </template>
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
