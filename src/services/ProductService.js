import axios from 'axios';

const BASE_REST_API_URL = 'http://localhost:8081/api/products';

export const getAllProducts = () => axios.get(BASE_REST_API_URL);