<script setup>
import {
  defineEmits,
  onMounted,
  ref,
  watch,
} from 'vue';

import Girl from '@/models/Girl';
// import MessageService from '@/services/infoMessageService';
import { useGirlsStore } from '@/stores/girlsStore';
import { useGroupsStore } from '@/stores/groupsStore';

const props = defineProps({
  girl: {
    type: Object,
    default: null,
  },
  isEditing: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['close']);
 const girlsStore = useGirlsStore();
// const groupsStore = useGroupsStore();
const form = ref({});
const formLabelWidth = '100px';
const loading = ref(false);


// onMounted(async () => {
//   await groupsStore.fetchItems();
// });
// const groups = computed(() => groupsStore.items);

const initialFormData =  {  
    name: '',
    tgAcc: '',
    nickName: '',
};

const resetForm = () => {
  form.value = { ...initialFormData };
};

watch(
  () => props.girl,
  (newGirl) => {
    if (props.isEditing && newGirl) {     
      form.value = { ...newGirl };           
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

const submitForm = () => {
  loading.value = true;
  const newGirl = {
    ...form.value,
  }

  if (props.isEditing) 
    girlsStore.updateItem(newGirl);  
  else 
    girlsStore.addItem(new Girl(newGirl));
  
  cancelForm();
  loading.value = false;
};

</script>

<template>
  <el-form :model="form">
    <el-form-item label="Имя" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Telegram" :label-width="formLabelWidth">
      <el-input v-model="form.tgAcc" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Nickname" :label-width="formLabelWidth">
      <el-input v-model="form.nickName"  autocomplete="off" />
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
@import '@/assets/styles/redefine.css';
</style>