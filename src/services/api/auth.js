import axios from 'axios';

import { setupInterceptors } from './interceptors';

const apiClient = axios.create({
    baseURL: 'http://localhost:5102/api',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true,
    timeout: 3000,
    timeoutErrorMessage: 'Request timed out',
});

setupInterceptors(apiClient);

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