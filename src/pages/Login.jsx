import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {signUp} from "./SignUp/api";
import {loginUser} from "./Login/api";





const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiProgress, setApiProgress] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        let user = await loginUser(email, password);

       if(user !==null ){
           onLogin(user);
           navigate("/");
       }else{
           setGeneralError('Login failed. Please check your credentials.');
       }
    };


    useEffect(() => {
        setErrors(function(lastErrors){
            return {...lastErrors,
                email: undefined
            }
        })
    }, [email]);

    useEffect(() => {
        setErrors(function(lastErrors){
            return {...lastErrors,
                password: undefined
            }
        })
    }, [password]);

    // const onSubmit =  (event) => {
    //     event.preventDefault();
    //     setSuccessMessage('');
    //     setGeneralError('');
    //     signUp({username, email, password})
    //         .then((response) => {setSuccessMessage(response.data.message) })
    //         .catch((axiosError) => {
    //             if(axiosError.response?.data && axiosError.response.status === 400) {
    //                 setErrors(axiosError.response.data.validationErrors);
    //             }else{
    //                 setGeneralError('Ein unbekannter Fehler ist aufgetreten.')
    //             }
    //         })
    //         .finally(() => setApiProgress(false));
    //     setApiProgress(true)
    //
    // };


    return (
        <div className="login-container">
            <h2 className="login-title">Anmeldung</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail-Adresse</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-Mail-Adresse eingeben"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Passwort</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passwort eingeben"
                    />
                </div>
                <button type="submit" className="btn btn-success">Einloggen</button>
                <div className="mt-3">
                    <p>Noch kein Mitglied? <Link to="/register">Registrieren</Link></p>
                    <p>Passwort vergessen? <Link to="/reset-password">Passwort zurücksetzen</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
