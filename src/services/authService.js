import axios from "axios";

export const registerUser = (userData) => {
    return axios.post('auth/register', userData);
};

export const loginUser = (credentials) => {
    return axios.post('auth/login', credentials);
};