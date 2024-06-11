import axios from 'axios';
import { setupInterceptors } from 'src/services/api/interceptors';

const apiClient = axios.create({
    baseURL: 'https://gmanagement-back-perovkin87.amvera.io/api',
    headers: {
        'Content-type': 'application/json'
    },   
});

// const apiClient = axios.create({
//     baseURL: 'http://localhost:5102/api',
//     headers: {
//         'Content-type': 'application/json'
//     },   
// });

setupInterceptors(apiClient);

export default apiClient