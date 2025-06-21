import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/ProductService';
import { getAllCategories } from '../services/CategoryService';

function EditProductComponent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getProductById(id)
            .then((res) => {
                const data = res.data;
                setProduct({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity,
                    categoryId: data.categoryId,
                });
            })
            .catch((err) => {
                console.error('Product not found', err);
                setNotFound(true);
            });

        getAllCategories()
            .then((res) => setCategories(res.data))
            .catch((err) => console.error('Failed to load categories', err));
    }, [id]);

    const validate = () => {
        const errors = {};
        if (!product.name.trim()) errors.name = 'Name is required.';
        if (!product.description.trim()) errors.description = 'Description is required.';
        if (!product.price || isNaN(product.price) || product.price <= 0) errors.price = 'Enter a valid price.';
        if (!product.quantity || isNaN(product.quantity) || product.quantity < 0) errors.quantity = 'Enter a valid quantity.';
        if (!product.categoryId) errors.categoryId = 'Category is required.';
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            await updateProduct(id, product);
            navigate('/products');
        } catch (error) {
            console.error('Failed to update product', error);
        } finally {
            setLoading(false);
        }
    };

    if (notFound) {
        return (
            <div className="container mt-4">
                <h3 className="text-danger">Product does not exist.</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={product.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={product.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        name="price"
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        value={product.price}
                        onChange={handleChange}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        name="quantity"
                        type="number"
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        value={product.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        name="categoryId"
                        className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}
                        value={product.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Saving...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
}

export default EditProductComponent;
