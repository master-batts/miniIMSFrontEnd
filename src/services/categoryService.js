import axios from 'axios';

const BASE_CATEGORY_API_URL = 'http://localhost:8081/api/categories';

export const getAllCategories = () => axios.get(BASE_CATEGORY_API_URL);
