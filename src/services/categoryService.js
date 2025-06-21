import axios from 'axios';

export const getAllCategories = () => axios.get('categories');
