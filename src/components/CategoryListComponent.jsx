import React, { useEffect, useState } from 'react';
import {getAllCategories} from "../services/categoryService.js";
import Loader from "./Loader.jsx";


function CategoryListComponent() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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
    }, []);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Category List</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category, index) => (
                    <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryListComponent;
