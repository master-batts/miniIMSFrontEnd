import axios from 'axios';


export const getAllProducts = () => axios.get('products');

export const addProduct = (product) => {
    return axios.post('products', {
        ...product,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity, 10),
        categoryId: parseInt(product.categoryId, 10),
    });
};