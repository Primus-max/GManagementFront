import { defineStore } from 'pinia';

import {
  addOperator,
  getOperators,
} from '@/services/api/operators';

export const useOperatorsStore = defineStore('operatorsStore', {
  state: () => ({
    operators: [],
  }),
  actions: {
    async fetchOperators() {
      this.operators = await getOperators();
    },
   async addOperator(operator) {
      const operatorId = await addOperator(operator);
      operator.id = operatorId;
      this.operators.push(operator);
    },
    updateOperator(updatedOperator) {
      const index = this.operators.findIndex(op => op.id === updatedOperator.id);
      if (index !== -1) {
        this.operators[index] = updatedOperator;
      }
    },
    deleteOperator(operatorId) {
      this.operators = this.operators.filter(op => op.id !== operatorId);
    },
  },
});
