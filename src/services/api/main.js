import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5102/api',
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true,
    timeout: 3000,
    timeoutErrorMessage: 'Request timed out',    
});

// Интерцептор для добавления токена в заголовки запросов
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      // Логика для обработки 401 ошибки (например, редирект на страницу логина)
      // Также можно удалить токен из localStorage
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  });