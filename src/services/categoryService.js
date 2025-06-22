import axios from 'axios';

export const getAllCategories = () => axios.get('categories');

export const getCategoryById = (id) => axios.get(`categories/${id}`);

export const createCategory = (category) => axios.post('categories', category);

export const updateCategory = (id, category) => axios.put(`categories/${id}`, category);

export const deleteCategory = (id) => axios.delete(`categories/${id}`);