import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryById, updateCategory } from '../services/CategoryService';

function EditCategoryComponent() {
    const { id } = useParams();
    const [category, setCategory] = useState({ name: '', description: '' });
    const [errors, setErrors] = useState({});
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryById(id)
            .then((res) => setCategory(res.data))
            .catch(() => setNotFound(true));
    }, [id]);

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
            await updateCategory(id, category);
            navigate('/categories');
        } catch (err) {
            alert('Error updating category');
        }
    };

    if (notFound) {
        return (
            <div className="container mt-5">
                <h3 className="text-danger">Category does not exist.</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Edit Category</h2>
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
                <button type="submit" className="btn btn-success">Update</button>
            </form>
        </div>
    );
}

export default EditCategoryComponent;
