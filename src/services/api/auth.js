import apiClient from '@/services/apiClient';

const login = async(credentials) => {
    try {
    const response = await apiClient.post('/auth/token', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);    
    return response.data;   
    } catch (error) {
        throw new Error('Login failed');
    }
}

export default { login };