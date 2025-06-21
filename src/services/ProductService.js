import axios from 'axios';


export const getAllProducts = () => axios.get('products');


export const getProductById = (id) => {
    return axios.get(`products/${id}`);
}

export const addProduct = (product) => {
    return axios.post('products', {
        ...product,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity, 10),
        categoryId: parseInt(product.categoryId, 10),
    });
};

export const updateProduct = (id, product) =>
    axios.put(`products/${id}`, {
        ...product,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity, 10),
        categoryId: parseInt(product.categoryId, 10),
    });