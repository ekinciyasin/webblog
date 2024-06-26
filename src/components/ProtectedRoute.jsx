import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, userRole, children }) => {
    if (!isLoggedIn || userRole !== 'ADMIN') {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;