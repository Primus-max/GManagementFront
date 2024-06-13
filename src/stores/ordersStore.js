import { defineStore } from 'pinia';
import {
  addItem,
  deleteItem,
  getAll,
  updateItem,
} from 'src/services/api/base/baseRepository';
import { getOrdersWidthDetails } from 'src/services/api/ordersRepos';
import MessageService from 'src/services/messageServices/infoMessageService';

export const useOrdersStore = defineStore('ordersStore', {    
    state: () => ({
        endpoint: 'orders',
        orders: [],
        ordersWithDetails: [],
    }),
    actions: {
        async fetchOrders() {
            this.orders = await getAll();
        },
        async getOrdersWidhDetails() {
            const response = await getOrdersWidthDetails(this.endpoint);
            if (response.status !== 200) {
                MessageService.error(response.statusText);
                return;
            }
            this.ordersWithDetails = response.data;
        },
        async addOrder(order) {
            const orderId = await addItem(this.endpoint,order);
            if (orderId === -1) {
                MessageService.error('Не удалось добавить заказ');
                return;
            }
            MessageService.success('Заказ успешно добавлен в базу');
            order.id = orderId;
            this.orders.push(order);
            await this.getOrdersWidhDetails();
            console.log(this.ordersWithDetails );
        },
        async updateOrder(updatedOrder) {
            const index = this.orders.findIndex(op => op.id === updatedOrder.id);
            if (index !== -1) {
                const response = await updateItem( this.endpoint, updatedOrder);
                if (response.status !== 200) {      
                    MessageService.error(response.statusText);
                    return;
                }
                MessageService.success('Данные успешно обновлены');
                this.orders[index] = updatedOrder;  
            }
        },
        async deleteOrder(order) {
            const response = await deleteItem( this.endpoint, order.id);
            if (response.status !== 200) {
                MessageService.error(response.statusText);
                return;
            }
            MessageService.success('Заказ успешно удален');
            this.orders = this.orders.filter(op => op.id !== order.id);
        },  
    },
});
