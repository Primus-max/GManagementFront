import axios from 'axios';
import { setupInterceptors } from 'src/services/api/interceptors';

const apiClient = axios.create({
    baseURL: 'http://amvera-perovkin87-run-gmanagment-back/api',
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