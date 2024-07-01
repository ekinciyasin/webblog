import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../state/AuthenticationContext";

const ProtectedRoute = ({children ,role}) => {

    const authContext = useContext(AuthContext)
    if (authContext.id === 0 || !role.includes(authContext.role) ) {

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;