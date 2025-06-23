import axios from 'axios';
import {getToken} from './authTokenService';

axios.defaults.baseURL = `http://localhost:8081/api/`;

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log(token);
        console.log("Token from interceptor: " + token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;