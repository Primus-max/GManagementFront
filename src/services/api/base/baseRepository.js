import apiClient from 'src/services/api/apiClient';

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

  // Специфичные методы для девушек
  export const addGirlsToGroup = async (endpoint, girls) => {
    try {
      const response = await apiClient.post(`${endpoint}/add-to-group`, girls);
      return response;
    } catch (error) {
      throw new Error(`Failed to add girls to group: ${error.message}`);
    }
  };

  export const removeGirlFromGroup = async (endpoint, girlId) => {
    try {
      const response = await apiClient.delete(`${endpoint}/remove-from-group/${girlId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to remove girl from group: ${error.message}`);
    }
  };

  export const getGirlsGroups = async (endpoint) => {
    try {
      const response = await apiClient.get(`${endpoint}/by-group`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error.message}`);
    }
  };

export const getGirlsOnMyShift = async (endpoint) => {
    try {
      const response = await apiClient.get(`${endpoint}/girls-in-my-shift`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch me: ${error.message}`);
    }
  }

  // Специфичные методы для операторов
  export const getMe = async (endpoint) => {
    try  {      
      const response = await apiClient.get(`${endpoint}/get-me`);

      localStorage.setItem('me', JSON.stringify(response.data));

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch me: ${error.message}`);
    }
  }

  export const getBalace = async (endpoint) => {
    try {
      const response = await apiClient.get(`${endpoint}/balance`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch balance: ${error.message}`);
    }
  }

