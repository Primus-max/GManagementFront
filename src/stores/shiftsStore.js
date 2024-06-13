import { defineStore } from 'pinia';
import {
  getCurrentShift,
  postShift,
} from 'src/services/api/shiftsRepos';
import MessageService from 'src/services/messageServices/infoMessageService';

export const useShiftsStore = defineStore("shiftsStore", {
  state: () => ({
    endpoint: "shifts",
    shifts: [],
    currentShift: null
  }),
  actions: {
    async fetchShifts() {},
    async fetchCurrentShift() {
      const response = await getCurrentShift(this.endpoint);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      this.currentShift = response.data;
    },
    async startShift(shift) {
      const response = await postShift(this.endpoint,shift);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success(`Смена успешно начата`);
      return response.data;
    }
  },
});
