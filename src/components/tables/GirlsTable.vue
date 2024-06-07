<script setup>
import {
  onMounted,
  ref,
} from 'vue';

import { useGroupsStore } from '@/stores/groupsStore';
import { getGroupName } from '@/utils/getters';
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue';

import AddGirlForm from '../modals/AddGirlForm.vue';

const props = defineProps({
  girls: {
    type: Array,
    required: true
  }
});

const groupsStore = useGroupsStore();
const groups = ref([]);
const dialogVisible = ref(false);
const editingGirl = ref(null);

onMounted(async () => {
  await groupsStore.fetchItems();
  groups.value = groupsStore.items;
});

const editGirl = (girl) => {
  dialogVisible.value = true;
  editingGirl.value = girl;
};

const deleteGirl = async (girl) => {
 await girlsStore.deleteItem(girl);
};
</script>

<template>
  <el-table :data="girls" class="table" size="large" fit>
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column prop="name" label="Имя"></el-table-column>
    <el-table-column prop="nickName" label="Ник"></el-table-column>
    <el-table-column prop="tgAcc" label="Телеграм"></el-table-column>
    <el-table-column label="Группа" >
      <template #default="{ row }">
        {{ row.groupId ? getGroupName(row.groupId, groups) : '--------' }}
      </template>
    </el-table-column>
    <el-table-column label="Действия" width="150">
      <template #default="{ row }">
        <el-button el-button type="text" class="control-button" :icon="Edit" @click="editGirl(row)" />
        <el-button type="text" class="control-button" :icon="Delete" @click="deleteGirl(row)" />
      </template>
    </el-table-column>
  </el-table>

  <el-drawer v-model="dialogVisible" title="Редактировать девушку" direction="ltr">
    <AddGirlForm @close="dialogVisible = false" :girl="editingGirl" :isEditing="true" />
  </el-drawer>

</template>

<style scoped>
@import '@/assets/styles/main.css';
</style>
