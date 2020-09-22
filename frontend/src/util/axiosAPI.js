import axios from 'axios';

export const apiUrlRoot = 'http://127.0.0.1:8000/api/v1/';

export const axiosInstance = axios.create({
    baseURL: apiUrlRoot,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
    }

})