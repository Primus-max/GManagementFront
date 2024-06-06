// src/stores/createStore.js
import { defineStore } from 'pinia';

import {
  addItem,
  deleteItem,
  getAll,
  updateItem,
} from '@/services/api/base/baseRepository';

export const createStore = (storeName, endpoint) => {
  return defineStore(storeName, {
    state: () => ({
      items: []
    }),
    actions: {
      async fetchItems() {
        this.items = await getAll(endpoint);
      },
      async addItem(item) {
        const itemId = await addItem(endpoint, item);
        if (itemId === -1) {
          MessageService.error(`Не удалось добавить элемент в ${endpoint}`);
          return;
        }
        MessageService.success(`Элемент успешно добавлен в ${endpoint}`);
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
          MessageService.success(`Данные элемента успешно обновлены в ${endpoint}`);
          this.items[index] = updatedItem;
        }
      },
      async deleteItem(item) {
        const response = await deleteItem(endpoint, item.id);
        if (response.status !== 200) {
          MessageService.error(response.statusText);
          return;
        }
        MessageService.success(`Элемент успешно удален из ${endpoint}`);
        this.items = this.items.filter(i => i.id !== item.id);
      }
    }
  });
};
