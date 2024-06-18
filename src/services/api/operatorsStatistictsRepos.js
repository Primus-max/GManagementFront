// import apiClient from 'src/services/api/apiClient';

// export const getOperatorsStatistics = async(endpoint) => {
//     try {
//     const response = await apiClient.get(`${endpoint}/statistics`);
//     return response;
//     } catch (error) {
//         throw new Error('Failed to fetch operators');
//     }
//   }
// export const getOperators = async() => {
//     try {
//     const response = await apiClient.get('/operators');
//     return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch operators');
//     }
// }

// export const addOperatorAtBase  = async (operator) => {
//     try {
//     const response = await apiClient.post('/operators', operator);
//     return response.data;
//     } catch (error) {
//         throw new Error('Failed to add operator');
//     }
// }

// export const updateOperatorAtBase   = async  (operator)  =>  {
//     try {
//     const response = await apiClient.put(`/operators`, operator);
//     return response;
//     } catch (error) {
//         throw new Error('Failed to update operator');
//     }
// }

// export const deleteOperatorAtBase  = async  (operatorId)  =>  {
//     try {
//     const response = await apiClient.delete(`/operators/${operatorId}`);
//     return response;
//     } catch (error) {
//         throw new Error('Failed to delete operator');
//     }
// }
