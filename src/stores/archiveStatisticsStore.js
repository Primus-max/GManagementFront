import { defineStore } from 'pinia';

export const useArchiveStatisticsStore = defineStore('archiveStatisticsStore', {
  state: () => ({
    date: null,
    operator: '',
    girl: '',
    amount: '',
    statistics: [],
  }),
  actions: {
    setDate(date) {
      this.date = date;
    },
    setOperator(operator) {
      this.operator = operator;
    },
    setGirl(girl) {
      this.girl = girl;
    },
    setAmount(amount) {
      this.amount = amount;
    },
    async fetchStatistics() {
      // Имитация запроса данных
      // Замените это реальным запросом к серверу
      this.statistics = [
        { id: 1, girl: 'Alice', client_name: 'John', amount: 100, split_percentage: 50, comment: 'Good service' },
        { id: 2, girl: 'Betty', client_name: 'Mike', amount: 200, split_percentage: 40, comment: 'Excellent service' }
      ];
    }
  }
});
