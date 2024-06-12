import { createStore } from 'src/stores/base/baseStore';

export const useOrdersStore = createStore('ordersStore', '/orders');
