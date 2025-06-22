import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/ProductService.js';
import { getAllCategories } from '../../services/categoryService.js';

function AddProductComponent() {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
            .then(res => setCategories(res.data))
            .catch(err => console.error('Failed to load categories', err));
    }, []);

    const validate = () => {
        const errors = {};
        if (!product.name.trim()) errors.name = 'Name is required.';
        if (!product.description.trim()) errors.description = 'Description is required.';
        if (!product.price || isNaN(product.price) || product.price <= 0) {
            errors.price = 'Price must be a positive number.';
        }
        if (!product.quantity || isNaN(product.quantity) || product.quantity < 0) {
            errors.quantity = 'Quantity must be zero or more.';
        }
        if (!product.categoryId) errors.categoryId = 'Please select a category.';
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
            await addProduct(product);
            navigate('/products');
        } catch (err) {
            console.error('Failed to add product:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
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
                        type="number"
                        step="0.01"
                        name="price"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        value={product.price}
                        onChange={handleChange}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
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
                        disabled={categories.length === 0}  // disable if no categories
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {categories.length === 0 && (
                        <small className="form-text text-muted mt-1">
                            No categories available. Please{' '}
                            <button
                                type="button"
                                className="btn btn-link p-0 align-baseline"
                                onClick={() => navigate('/add-category')}
                            >
                                add a category
                            </button>
                            .
                        </small>
                    )}

                    {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default AddProductComponent;
