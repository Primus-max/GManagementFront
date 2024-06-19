import apiClient from 'src/services/api/apiClient';

export const getOrdersWidthDetails = async (endpoint, type) => {
  try {
    const response = await apiClient.get(`${endpoint}/orders-with-details`, type);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

