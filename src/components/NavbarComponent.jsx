import React from 'react';
import { NavLink } from 'react-router-dom';

function NavbarComponent() {
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
                    <div className="navbar-nav ms-auto">
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;
