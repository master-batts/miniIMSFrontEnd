import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../services/CategoryService';
import Loader from './Loader';

function CategoryListComponent() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCategories = () => {
        setLoading(true);
        getAllCategories()
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id)
                .then(() => fetchCategories())
                .catch(err => {
                    console.error('Delete failed', err);
                    alert('Failed to delete category');
                });
        }
    };

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Category List</h2>
                <button className="btn btn-primary" onClick={() => navigate('/add-category')}>
                    + Add Category
                </button>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ width: '150px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="text-center">No categories found.</td>
                    </tr>
                ) : (
                    categories.map((cat, index) => (
                        <tr key={cat.id}>
                            <td>{index + 1}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-category/${cat.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cat.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryListComponent;
