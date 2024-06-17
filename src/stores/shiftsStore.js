import { defineStore } from 'pinia';
import { PAGE_ITEMS_LIMIT } from 'src/constants';
import {
  endShift,
  getCurrentShift,
  getShiftsWithDetails,
  getUnpaidShifts,
  payShift,
  postShift,
} from 'src/services/api/shiftsRepos';
import MessageService from 'src/services/messageServices/infoMessageService';

// const pagination = usePagination();


export const useShiftsStore = defineStore("shiftsStore", {
  state: () => ({
    endpoint: "shifts",
    shifts: [],
    currentShift: null,
    unpaidShifts: [],
    shiftsWithOrders: [],
    // Пагинация
    totalShifts: 0,
  
  }),

  actions: {
    async fetchShifts() {},
    async fetchCurrentShift() {
      try {
        const response = await getCurrentShift(this.endpoint);

        if (response.status === 200) {
          this.currentShift = response.data;
        } else {
          this.currentShift = null;
        }
      } catch (error) {
        this.currentShift = null;
      }
    },

    async startShift(shift) {
      const response = await postShift(this.endpoint, shift);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success(`Смена началась`);
      return response.data;
    },
    
    async stopShift(shiftId) {
      const response = await endShift(this.endpoint, shiftId);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      return response.data;
    },

    async fetchShiftsWithDetails(searchParams) {
      const response = await getShiftsWithDetails(this.endpoint, searchParams);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }

      this.shiftsWithOrders = response.data.items;
      this.totalShifts = response.data.totalCount;
      return response.data;
    },

    async getUnpaidShifts() {
      try {
        const response = await getUnpaidShifts(this.endpoint);

        if (response.status === 200) {
          this.unpaidShifts = response.data;
        } else {
          this.currentShift = null;
        }
      } catch (error) {
        console.log("Не удалось получить не выплаченные смены", error);
      }
    },

    async payShift(shiftId) {
      const response = await payShift(this.endpoint, shiftId);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      const shift = this.shiftsWithOrders.find((shift) => shift.id === shiftId);
      if (!shift) return;

      shift.isPaid = true;
      MessageService.success("Смена выплачена");
    },

    async resetPagination() {
      const searchParams  = {
        limit: PAGE_ITEMS_LIMIT,
        offset: 0,
      }
      await this.fetchShiftsWithDetails(searchParams);
    },
   
    async searchShifts(searchParams) {
      await this.fetchShiftsWithDetails(searchParams);
    },
  },
});
