import apiClient from 'src/services/api/apiClient';

export const getOrdersWidthDetails = async (endpoint) => {
  try {
    const response = await apiClient.get(`${endpoint}/orders-with-details`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

