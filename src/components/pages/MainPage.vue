<script setup>
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/tooltip/style/css';
import 'element-plus/es/components/table/style/css';

import { ref } from 'vue';

import { ElMessage } from 'element-plus';

import {
  Check,
  Close,
  Delete,
  Edit,
  Money,
} from '@element-plus/icons-vue';

const orders = ref([
    { id: 1, girl: 'Девушка1', client_name: 'Клиент1', amount: 100, split_percentage: 50, comment: 'Комментарий1', is_extended: false, is_cancelled: false },
    { id: 2, girl: 'Девушка2', client_name: 'Клиент2', amount: 200, split_percentage: 60, comment: 'Комментарий2', is_extended: true, is_cancelled: true }
  ]);
  
  const editOrder = (order) => {
    ElMessage.info(`Редактировать заказ: ${order.id}`);
  };
  
  const deleteOrder = (order) => {
    ElMessage.info(`Удалить заказ: ${order.id}`);
  };
  
  const cancelOrder = (order) => {
    ElMessage.info(`Отмена заказа: ${order.id}`);
  };
  
  const extendOrder = (order) => {
    ElMessage.info(`Продление заказа: ${order.id}`);
  };
  
  const payOrder = (order) => {
    ElMessage.info(`Выплата заказа: ${order.id}`);
  };
  
</script>

<template>
    <div class="main-page">
      <div class="page-wrapper">
        <Header>
          <h1 class="page-title">Текущие заказы</h1>
        </Header>
        <el-table :data="orders" class="table" size="large">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="girl" label="Девушка"></el-table-column>
          <el-table-column prop="client_name" label="Клиент"></el-table-column>
          <el-table-column prop="amount" label="Сумма заказа"></el-table-column>
          <el-table-column prop="split_percentage" label="Split %"></el-table-column>
          <el-table-column prop="comment" label="Комментарий"></el-table-column>
          <el-table-column label="Действия">
            <template v-slot="scope">
              <el-tooltip placement="left"  content="Отмена">
                <el-button class="control-button"  type="text" @click="cancelOrder(scope.row)">
                  <el-icon>
                    <Close />
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip placement="left" content="Продление">
                <el-button class="control-button"  type="text" @click="extendOrder(scope.row)">
                  <el-icon>
                    <Check />
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip placement="left"   content="Редактировать">
                <el-button class="control-button" type="text" @click="editOrder(scope.row)">
                  <el-icon>
                    <Edit />
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip placement="left"   content="Удалить">
                <el-button class="control-button" type="text" @click="deleteOrder(scope.row)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip placement="left"   content="Выплата">
                <el-button class="control-button" type="text" @click="payOrder(scope.row)">
                  <el-icon>
                    <Money />
                  </el-icon>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <style scoped>
@import '@/assets/styles/main.css';

  .page-title {
    margin: 0;
    padding: 0;
    font-size: 24px;
  }
  
  .page-wrapper {
    max-width: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .table {
    display: flex;
    margin-top: 20px;
  }



  </style>
  