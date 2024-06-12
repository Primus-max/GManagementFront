import { defineStore } from 'pinia';
import { postShift } from 'src/services/api/shiftsRepos';
import MessageService from 'src/services/messageServices/infoMessageService';

export const useShiftsStore = defineStore("shiftsStore", {
  state: () => ({
    shifts: [],
    currentShift: null
  }),
  actions: {
    async fetchShifts() {},
    async startShift(shift) {
      const response = await postShift(shift);
      if (response.status !== 200) {
        MessageService.error(response.statusText);
        return;
      }
      MessageService.success(`Смена успешно начата`);
      return response.data;
    }
  },
});
