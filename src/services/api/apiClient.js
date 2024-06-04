import axios from 'axios';

import { setupInterceptors } from '@/services/interceptors';

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

export default apiClient