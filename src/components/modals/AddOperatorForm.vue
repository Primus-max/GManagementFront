<script setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';

import Operator from '@/models/Operator';
import MessageService from '@/services/infoMessageService';
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
  groupName: ''
};

// Инициализация формы
const resetForm = () => {
  form.value = { ...initialFormData };
};

const groups = computed(() => groupsStore.items);
const getGroupName = (groupId) => {    
  const group = groups.value.find(group => group.id === groupId);
  return group ? group.name : '';
};

// Обновление формы в зависимости от режима редактирования/добавления
watch(
  () => props.operator,
  (newOperator) => {
    if (props.isEditing && newOperator) {
      const groupName = getGroupName(newOperator.groupId);
      if (groupName) {
        form.value.groupName = groupName;
      } else {
        form.value.groupName = '';
      }
      form.value = { ...newOperator };

      // Обновление el-select после изменения form.groupName
      nextTick(() => {
          form.value.groupName = groupName;
      });
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
  if (!form.value?.groupName) {
    MessageService.warning('Выберите группу для оператора');
    return;
  }
  
  loading.value = true;
  try {
    // Найти группу по имени
    const selectedGroup = groups.value?.find(group => group.name === form.value.groupName);
    if (!selectedGroup) {
      throw new Error('Группа не найдена');
    }
    
    // Создать объект оператора и установить groupId
    const operatorData = {
      ...form.value,
      groupId: selectedGroup.id,
    };

    if (props.isEditing) {
      await operatorsStore.updateItem(operatorData);
    } else {
      await operatorsStore.addItem(new Operator(operatorData));
    }
    
    cancelForm();
  } catch (error) {
    console.error('Failed to submit form', error);
    MessageService.error('Не удалось отправить форму');
  } finally {
    loading.value = false;
  }
};

const addGroup = () => {  
  const newGroupName = document.getElementById('select').value;
  if (newGroupName && !groups.value?.find(group => group.name === newGroupName)) {
    groupsStore.addItem({ name: newGroupName });
    MessageService.success(`Группа ${newGroupName} успешно добавлена`);
    form.value.groupName = newGroupName;
  } else if (groupsStore.groups.find(group => group.name === newGroupName)) {
    MessageService.error('Группа с таким именем уже существует');
  }
};

const deleteGroup = () => {
  const group = groups.value.find(group => group.name === form.value.groupName);
  groupsStore.deleteItem(group);
  document.getElementById('select').value = '';
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
      <el-select v-model="form.groupName"   id="select"
        filterable  :reserve-keyword="false" allow-create :clearable="true">
        <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.name" />
        <template #footer>
          <el-button type="danger" v-if="groups.length > 0" @click="deleteGroup" text bg
            size="small">Удалить</el-button>
          <el-button type="primary" @click="addGroup" text bg size="small">Добавить</el-button>
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
