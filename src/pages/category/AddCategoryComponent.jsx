import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/categoryService.js';

function AddCategoryComponent() {
    const [category, setCategory] = useState({ name: '', description: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!category.name.trim()) errors.name = 'Name is required';
        if (!category.description.trim()) errors.description = 'Description is required';
        return errors;
    };

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        try {
            await createCategory(category);
            navigate('/categories');
        } catch (err) {
            alert('Error saving category');
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={category.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={category.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    );
}

export default AddCategoryComponent;
