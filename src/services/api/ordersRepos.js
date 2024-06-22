import apiClient from 'src/services/api/apiClient';

export const getOrdersWidthDetails = async (endpoint, type) => {
  try {
    const response = await apiClient.get(`${endpoint}/orders-with-details`, {
      params: { type: "grouped" }
  });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

export const extendOrder = async (endpoint, extendedOrder) => {
  try {
    const response = await apiClient.post(`${endpoint}/extend`, extendedOrder);
    return response;
  } catch (error) {
    throw new Error(`Failed to extend order: ${error.message}`);
  }
};

