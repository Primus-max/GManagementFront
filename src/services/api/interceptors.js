export const setupInterceptors = (apiClient) => {
  // Интерцептор для добавления токена к заголовкам запросов
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp * 1000;
      const now = new Date().getTime();
      if (tokenExpiry < now) {
        // Токен истек, перенаправляем на страницу авторизации
        localStorage.removeItem('token');
        window.authStore.logout();
        window.location.href = '/authorization'; // Перенаправляем на страницу авторизации
        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Интерцептор для обработки ответов
  apiClient.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      // Обрабатываем 401 ошибку (например, редирект на страницу логина)
      localStorage.removeItem('token');
      window.authStore.logout();
      window.location.href = '/authorization'; // Перенаправляем на страницу авторизации
    }
    return Promise.reject(error);
  });
};
