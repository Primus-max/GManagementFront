import axios from 'axios';
import { setupInterceptors } from 'src/services/api/interceptors';

let url = process.env.NODE_ENV === 'development' 
? 'http://localhost:5131/api' 
: 'https://gmanagement-back-perovkin87.amvera.io/api';

const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json'
    },   
});

setupInterceptors(apiClient);

export default apiClient