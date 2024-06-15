import apiClient from 'src/services/api/apiClient';

export const getShifts = async () => {
  try {
    const response = await apiClient.get("/shifts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch shifts");
  }
};

export const postShift = async (endpoint, data) => {
  try {
    const response = await apiClient.post(`/${endpoint}/start-shift`, data);
    return response;
  } catch (error) {
    throw new Error("Failed to add shift");
  }
};

export const getCurrentShift = async (endpoint) => {
  try {
    const response = await apiClient.get(`/${endpoint}/current-shift`);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const endShift = async (endpoint, shiftId) => {
  try {
    const response = await apiClient.get(`/${endpoint}/end-shift`, shiftId);
    return response;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getShiftsWithDetails = async (endpoint) => {
  try {
    const response = await apiClient.get(`${endpoint}/shifts-with-orders`);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch shifts");
  }
};

export const getUnpaidShifts = async (endpoint) => {
  try {
    const response = await apiClient.get(`${endpoint}/unpaid-shifts`);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch balance: ${error.message}`);
  }
};
