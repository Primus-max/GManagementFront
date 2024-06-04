import axios from 'axios';

import { setupInterceptors } from '@/services/api/interceptors';

const apiClient = axios.create({
    baseURL: 'http://localhost:5102/api',
    headers: {
        'Content-type': 'application/json'
    },   
});

setupInterceptors(apiClient);

export default apiClient