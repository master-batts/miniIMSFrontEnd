import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function NavbarComponent() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-3">
                <NavLink className="navbar-brand fw-bold fs-4" to="/">
                    miniIMS
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                <span className="navbar-text text-warning me-3">
                  Welcome, {user?.username || user?.name || 'User'}
                </span>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        'nav-link px-3' + (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    to="/categories"
                                    className={({ isActive }) =>
                                        'nav-link px-3' + (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    Categories
                                </NavLink>
                                <button className="btn btn-outline-warning ms-3" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        'nav-link px-3' + (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        'nav-link px-3' + (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;
