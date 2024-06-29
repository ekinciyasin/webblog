import React, {createContext, useState} from 'react';
import {loadAuthState, storeAuthState} from "./storage";

export const AuthContext = createContext();


function AuthenticationContext(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [auth, setAuth] = useState(loadAuthState());

    const onLoginSuccess = (data) => {
        setAuth(data);
        storeAuthState(data);
    }

    return (
        <AuthContext.Provider value={{...auth ,onLoginSuccess}}>
             {props.children}
        </AuthContext.Provider>
    );
}

export default AuthenticationContext;