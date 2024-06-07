import { defineStore } from 'pinia';

export const useGirlsStatisticsStore = defineStore('girlsStatisticsStore', {
  state: () => ({
    date: null,
    girl: '',
    statistics: [],
  }),
  actions: {
    setDate(date) {
      this.date = date;
    },
    setGirl(girl) {
      this.girl = girl;
    },
    async fetchStatistics() {
      // Имитация запроса данных
      // Замените это реальным запросом к серверу
      this.statistics = [
        { id: 1, username: 'Girl1', totalOrders: 120, totalAmount: 1200 },
        { id: 2, username: 'Girl2', totalOrders: 180, totalAmount: 1800 }
      ];
    }
  }
});
