import axios from 'axios';
import axiosInstance from './axiosConfig';

export const getAllCategories = () => axios.get('categories');

export const getCategoriesPaged = (page = 0, size = 5, sort = 'id,asc') =>
    axios.get(`categories/paged?page=${page}&size=${size}&sort=${sort}`);

export const getCategoryById = (id) => axios.get(`categories/${id}`);

export const createCategory = (category) => axios.post('categories', category);

export const updateCategory = (id, category) => axios.put(`categories/${id}`, category);

export const deleteCategory = (id) => axios.delete(`categories/${id}`);