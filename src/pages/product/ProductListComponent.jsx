import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader.jsx';
import { getPagedProducts, deleteProduct } from '../../services/ProductService.js';

function ListProductsComponent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(5); // fixed size per page
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const fetchProducts = (pageNumber = 0) => {
        setLoading(true);
        getPagedProducts(pageNumber, size, 'id,asc')
            .then(response => {
                // Response from Spring Data Pageable contains content, totalPages, etc.
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
                setPage(response.data.number);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id)
                .then(() => fetchProducts(page))
                .catch(err => {
                    console.error('Delete failed', err);
                    alert('Failed to delete product');
                });
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchProducts(newPage);
        }
    };

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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Product List</h2>
                <button className="btn btn-primary" onClick={() => navigate('/add-product')}>
                    + Add Product
                </button>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price ($)</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th style={{ width: '150px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center">No products found.</td>
                    </tr>
                ) : (
                    products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{page * size + index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>{product.categoryName}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => navigate(`/products/edit/${product.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(product.id)}
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
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                            Previous
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(i)}>
                                {i + 1}
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

export default ListProductsComponent;
