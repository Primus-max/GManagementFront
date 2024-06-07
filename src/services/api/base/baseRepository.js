import apiClient from '@/services/api/apiClient';

export const getAll = async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
  };

  export const getById = async (endpoint, itemId) => {
    try {
      const response = await apiClient.get(`${endpoint}/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch item from ${endpoint}`);
    }
  };
  
  export const addItem = async (endpoint, item) => {
    try {
      const response = await apiClient.post(endpoint, item);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add item to ${endpoint}`,error);
    }
  };
  
  export const updateItem = async (endpoint, item) => {
    try {
      const response = await apiClient.put(endpoint, item);
      return response;
    } catch (error) {
      throw new Error(`Failed to update item in ${endpoint}`);
    }
  };
  
  export const deleteItem = async (endpoint, itemId) => {
    try {
      const response = await apiClient.delete(`${endpoint}/${itemId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete item from ${endpoint}`, error);
    }
  };

  export const executeSql = async (endpoint, sqlModel) => {
    try {
      const response = await apiClient.post(`${endpoint}/query`, sqlModel);
      return response.data;
    } catch (error) {      
      throw new Error(`Failed to execute SQL on ${endpoint}: ${error.message}`);
    }
  };