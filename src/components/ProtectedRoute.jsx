import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../state/AuthenticationContext";

const ProtectedRoute = ({children}) => {
    const authContext = useContext(AuthContext)
    if (authContext.id === 0 || authContext.role !== 'ADMIN') {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;