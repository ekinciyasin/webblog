import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, userRole, children }) => {
    if (!isLoggedIn || userRole !== 'admin') {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;