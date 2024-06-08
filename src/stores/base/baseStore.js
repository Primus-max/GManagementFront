// src/stores/createStore.js
import { defineStore } from 'pinia';

import {
  addGirlsToGroup,
  addItem,
  deleteItem,
  executeSql,
  getAll,
  getById,
  updateItem,
} from '@/services/api/base/baseRepository';
import MessageService from '@/services/infoMessageService';

export const createStore = (storeName, endpoint) => {
  return defineStore(storeName, {
    state: () => ({
      items: []
    }),
    actions: {
      async fetchItems() {
        this.items = await getAll(endpoint);
      },
      async getElementById(itemId) {
        return await getById(endpoint, itemId);
      },
      async addItem(item) {
        const itemId = await addItem(endpoint, item);
        if (itemId === -1) {
          MessageService.error(`Не удалось добавить элемент`);
          return;
        }
        MessageService.success(`Данные успешно добавлены`);
        item.id = itemId;
        this.items.push(item);
      },
      async updateItem(updatedItem) {
        const index = this.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          const response = await updateItem(endpoint, updatedItem);
          if (response.status !== 200) {
            MessageService.error(response.statusText);
            return;
          }
          MessageService.success(`Данные успешно обновлены`);
          this.items[index] = updatedItem;
        }
      },
      async deleteItem(item) {
        const response = await deleteItem(endpoint, item.id);
        if (response.status !== 200) {
          MessageService.error(response.statusText);
          return;
        }
        MessageService.success(`Элемент успешно удален`);
        this.items = this.items.filter(i => i.id !== item.id);
      },
      async executeFromSql(sqlModel) {
        try {
          const result = await executeSql(endpoint,sqlModel);
          return result;
        } catch (error) {
          console.error(error.message);
          MessageService.error(`Ошибка выполнения SQL-запроса: ${error.message}`);
        }
      },
      async addGirlsToGroup(girls) {
        const response = await addGirlsToGroup(endpoint, girls);
        if (response.status !== 200) {
          MessageService.error(response.statusText);
          return;
        }
        MessageService.success(`Данные успешно обновлены`);
      }
    }
  });
};
