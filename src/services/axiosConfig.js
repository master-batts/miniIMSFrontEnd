import axios from 'axios';
import {getToken, removeToken} from './authTokenService';

axios.defaults.baseURL = `http://localhost:8081/api/`;

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
    }
    return error;
});

export default axios;