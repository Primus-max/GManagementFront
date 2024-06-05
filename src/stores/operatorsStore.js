import { defineStore } from 'pinia';

import {
  addOperatorAtBase,
  getOperators,
  updateOperatorAtBase,
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
      const operatorId = await addOperatorAtBase(operator);
      operator.id = operatorId;
      this.operators.push(operator);
    },
    async updateOperator(updatedOperator) {
      const index = this.operators.findIndex(op => op.id === updatedOperator.id);
      if (index !== -1) {
        await updateOperatorAtBase(updatedOperator);
        this.operators[index] = updatedOperator;
      }
    },
    deleteOperator(operatorId) {
      this.operators = this.operators.filter(op => op.id !== operatorId);
    },
  },
});
