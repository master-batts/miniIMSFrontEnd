import { Navigate } from "react-router-dom";
import {isAuthenticated} from "../services/authService.js";

;


const AuthRoute = ({ element, restricted = false, ...rest }) => {
    if (restricted && isAuthenticated()) {
        return <Navigate to="/" />;
    }

    if (!restricted && !isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return element;
};

export default AuthRoute;
