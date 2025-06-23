import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AuthRoute = ({ element, restricted = false }) => {
    const { isAuthenticated } = useAuth();
    
    if (restricted && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!restricted && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return element;
};

export default AuthRoute;
