import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FaBoxOpen, FaTags, FaSignOutAlt, FaUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function NavbarComponent() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
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
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        'nav-link d-flex align-items-center px-3' +
                                        (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    <FaBoxOpen className="me-1" /> Products
                                </NavLink>

                                <NavLink
                                    to="/categories"
                                    className={({ isActive }) =>
                                        'nav-link d-flex align-items-center px-3' +
                                        (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    <FaTags className="me-1" /> Categories
                                </NavLink>

                                {/* User dropdown */}
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center text-warning"
                                        href="#!"
                                        id="userDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <FaUserCircle className="me-1 fs-5" />
                                        {user?.username || user?.name || 'User'}
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="userDropdown"
                                    >
                                        <li>
                                            <button
                                                className="dropdown-item d-flex align-items-center text-danger"
                                                onClick={handleLogout}
                                            >
                                                <FaSignOutAlt className="me-2" /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        'nav-link d-flex align-items-center px-3' +
                                        (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    <FaSignInAlt className="me-1" /> Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        'nav-link d-flex align-items-center px-3' +
                                        (isActive ? ' active text-warning' : '')
                                    }
                                >
                                    <FaUserPlus className="me-1" /> Register
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
