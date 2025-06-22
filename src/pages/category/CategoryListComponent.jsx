import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoriesPaged, deleteCategory } from '../../services/categoryService.js';
import Loader from '../../components/Loader.jsx';

function CategoryListComponent() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(5); // page size fixed at 5, you can make this dynamic if you want
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchCategories = (pageNumber = page) => {
        setLoading(true);
        getCategoriesPaged(pageNumber, size)
            .then(response => {
                setCategories(response.data.content); // page content
                setTotalPages(response.data.totalPages);
                setPage(response.data.number);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories(0); // load first page on mount
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id)
                .then(() => fetchCategories(page)) // reload current page after delete
                .catch(err => {
                    console.error('Delete failed', err);
                    alert('Failed to delete category');
                });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchCategories(newPage);
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
                            <td>{page * size + index + 1}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/categories/edit/${cat.id}`)}
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

            {/* Pagination controls */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => (
                        <li key={idx} className={`page-item ${idx === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(idx)}>
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryListComponent;
