import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService.js';
import { useAuth } from '../../context/AuthContext.jsx'; // make sure the path is correct

function LoginComponent() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        usernameOrEmail: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const validate = () => {
        const errs = {};
        if (!credentials.usernameOrEmail.trim()) errs.usernameOrEmail = 'Username or Email is required.';
        if (!credentials.password) errs.password = 'Password is required.';
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const res = await loginUser(credentials);
            const token = res.data.accessToken;
            login(token);
            navigate('/');
        } catch (err) {
            console.error(err);
            setServerError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '450px' }}>
            <h2 className="mb-4 text-center">Login</h2>
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Username or Email</label>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        className={`form-control ${errors.usernameOrEmail ? 'is-invalid' : ''}`}
                        value={credentials.usernameOrEmail}
                        onChange={handleChange}
                    />
                    {errors.usernameOrEmail && <div className="invalid-feedback">{errors.usernameOrEmail}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>

                <div className="text-center mt-3">
                    <small>Don't have an account? <a href="/register">Register</a></small>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
