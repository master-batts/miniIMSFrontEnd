import axios from "axios";

export const registerUser = (userData) => {
    return axios.post('auth/register', userData);
};