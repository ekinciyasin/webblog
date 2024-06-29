import React, {createContext, useState} from 'react';
import {loadAuthState, storeAuthState} from "./storage";

export const AuthContext = createContext();


function AuthenticationContext(props) {
    const [auth, setAuth] = useState(loadAuthState());

    const onLoginSuccess = (data) => {
        setAuth(data);
        storeAuthState(data);
    }

    const onLogoutSuccess = () => {
        setAuth({id:0})
        storeAuthState({id:0})
    }

    return (
        <AuthContext.Provider value={{...auth ,onLoginSuccess,onLogoutSuccess}}>
             {props.children}
        </AuthContext.Provider>
    );
}

export default AuthenticationContext;