import { defineStore } from 'pinia';
import {
  endShift,
  getCurrentShift,
  getShiftsWithDetails,
  getUnpaidShifts,
  postShift,
} from 'src/services/api/shiftsRepos';
import MessageService from 'src/services/messageServices/infoMessageService';

export const useShiftsStore = defineStore("shiftsStore", {
  state: () => ({
    endpoint: "shifts",
    shifts: [],
    currentShift: null,
    unpaidShifts: [],   
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

    async fetchShiftsWithDetails() {
      const response = await getShiftsWithDetails(this.endpoint);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
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
  }
  },
});
