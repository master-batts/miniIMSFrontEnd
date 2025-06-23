import axios from "axios";
import axiosInstance from './axiosConfig';
import {getToken} from "./authTokenService.js";

export const registerUser = (userData) => {
    return axios.post('auth/register', userData);
};

export const loginUser = (credentials) => {
    return axios.post('auth/login', credentials);
};

export const isAuthenticated = () => {
    return !!getToken();
};
