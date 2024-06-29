import { defineStore } from 'pinia';
import {
  addItem,
  deleteItem,
  getAll,
  updateItem,
} from 'src/services/api/base/baseRepository';
import {
  cancelOrder,
  extendOrder,
  getOrdersWidthDetails,
} from 'src/services/api/ordersRepos';
import MessageService from 'src/services/messageServices/infoMessageService';
import { calculateSummary } from 'src/utils/ordersUtils';

export const useOrdersStore = defineStore("ordersStore", {
  state: () => ({
    endpoint: "orders",
    orders: [],
    ordersWithDetails: [],
    ordersSummary: {
      totalAmount: 0,
      cashlessAmount: 0,
      mySalary: 0,
      splitSalary: 0,
    },
  }),

  getters: {
    getTotalAmount: (state) => state.ordersSummary.totalAmount,
    getCashlessAmount: (state) => state.ordersSummary.cashlessAmount,
    getMySalary: (state) => state.ordersSummary.mySalary,
    getSplitSalary: (state) => state.ordersSummary.splitSalary,
  },

  actions: {
    async fetchOrders() {
      this.orders = await getAll();
    },
    async getOrdersWidhDetails(type) {
      const response = await getOrdersWidthDetails(this.endpoint, type);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      this.ordersWithDetails = response.data;
      this.calculateSummary();
    },

    calculateSummary() {
      const summary = calculateSummary(this.ordersWithDetails);
      this.ordersSummary.totalAmount = summary.totalAmount;
      this.ordersSummary.cashlessAmount = summary.cashlessAmount;
      this.ordersSummary.mySalary = summary.mySalary;
      this.ordersSummary.splitSalary = summary.splitSalary;
    },

    async addOrder(order) {
      const orderId = await addItem(this.endpoint, order);
      if (orderId === -1) {
        MessageService.error("Не удалось добавить заказ");
        return;
      }
      MessageService.success("Заказ успешно добавлен в базу");
      order.id = orderId;
      this.orders.push(order);
      await this.getOrdersWidhDetails();
      console.log(this.ordersWithDetails);
    },
    async updateOrder(updatedOrder) {      
      const index = this.orders.findIndex((op) => op.id === updatedOrder.id);
      if (index !== -1) {
        const response = await updateItem(this.endpoint, updatedOrder);
        if (response.status !== 200) {
          MessageService.error(response.statusText);
          return;
        }
        MessageService.success("Данные успешно обновлены");
        this.orders[index] = updatedOrder;
      }
    },

    async extendOrder(order) {
      const response = await extendOrder(this.endpoint, order);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success("Заказ успешно продлён");
      await this.getOrdersWidhDetails();
    },

    async cancelOrder(order) {
      const response = await cancelOrder(this.endpoint, order);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success("Заказ успешно отменен");      
      const index = this.ordersWithDetails.findIndex((op) => op.id === order.id);
      if (index !== -1) this.ordersWithDetails[index].isCanceled = true;      
      //this.orders = this.orders.filter((op) => op.id !== order.id);
    },

    async deleteOrder(order) {
      const response = await deleteItem(this.endpoint, order.id);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success("Заказ успешно удален");
      this.orders = this.orders.filter((op) => op.id !== order.id);
    },
  },
});
