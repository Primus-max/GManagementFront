import apiClient from 'src/services/api/apiClient';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/token", credentials);
    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    const token = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw new Error("Login failed", error);
  }
};
