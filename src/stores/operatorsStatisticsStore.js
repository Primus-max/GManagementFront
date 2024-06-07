import { defineStore } from 'pinia';

export const useSearchStatisticsStore = defineStore('operatorsStatisticsStore', {
  state: () => ({
    date: null,
    operator: '',
    statistics: [],
  }),
  actions: {
    setDate(date) {
      this.date = date;
    },
    setOperator(operator) {
      this.operator = operator;
    },
    async fetchStatistics() {
      // Имитация запроса данных
      // Замените это реальным запросом к серверу
      this.statistics = [
        { id: 1, username: 'Operator1', totalOrders: 100, totalAmount: 1000 },
        { id: 2, username: 'Operator2', totalOrders: 150, totalAmount: 1500 }
      ];
    }
  }
});
