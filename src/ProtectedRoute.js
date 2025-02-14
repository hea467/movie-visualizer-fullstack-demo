import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    const location = useLocation(); // ✅ Get the current URL

    return user ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} /> // ✅ Pass last visited page
    );
};

export default ProtectedRoute;
