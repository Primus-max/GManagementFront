import { createStore } from 'src/stores/base/baseStore';

export const useOperatorsStore = createStore('operatorsStore', '/operators');

// export const useOperatorsStore = defineStore('operatorsStore', {
//   state: () => ({
//     operators: [],
//   }),
//   actions: {
//     async fetchOperators() {
//       this.operators = await getOperators();
//     },
//    async addOperator(operator) {
//       const operatorId = await addOperatorAtBase(operator);
//       if (operatorId === -1){
//         MessageService.error("Не удалось добавить оператора");
//         return;
//       } 
//       MessageService.success(`Оператор ${operator.name} успешно добавлен в базу`);
//       operator.id = operatorId;
//       this.operators.push(operator);
//     },
//     async updateOperator(updatedOperator) {
//       const index = this.operators.findIndex(op => op.id === updatedOperator.id);
//       if (index !== -1) {
//        const response = await updateOperatorAtBase(updatedOperator);
//        if (response.status !== 200)  {
//         MessageService.error(response.statusText);
//         return;
//       }
//       MessageService.success(`Данные оператора ${updatedOperator.name} успешно обновлены`);
//         this.operators[index] = updatedOperator;
//       }
//     },

//    async deleteOperator(operator) {
//      const response = await deleteOperatorAtBase(operator.id);
//       if (response.status !== 200)  {
//         MessageService.error(response.statusText);
//         return;
//       }
//       MessageService.success(`Оператор ${operator.name} успешно удален`);
//       this.operators = this.operators.filter(op => op.id !== operator.id);
//     },
//   },
// });
