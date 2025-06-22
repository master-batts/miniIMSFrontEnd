import axios from 'axios';


export const getAllProducts = () => axios.get('products');

export const getPagedProducts = (page = 0, size = 5, sort = 'id,asc') => {
    return axios.get(`products/paged?page=${page}&size=${size}&sort=${sort}`);
};

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

export const deleteProduct = (id) => {
    return axios.delete(`products/${id}`);
};
