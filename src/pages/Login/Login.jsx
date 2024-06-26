import React, {useContext, useEffect, useState} from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {login} from "./api";
import Input from "../../components/Input";
import {AuthContext} from "../../state/AuthenticationContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();
    const authState = useContext(AuthContext)
    const handleLogin = async (event) => {
        event.preventDefault();
        let user;
        try {
            user = await login(email, password);
            authState.onLoginSuccess(user);
            navigate("/");
        } catch (error) {
            setGeneralError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
        }
    };

    useEffect(() => {
        setErrors(function(lastErrors){
            return {...lastErrors,
                email: undefined
            }
        })
        setGeneralError('')
    }, [email]);

    useEffect(() => {
        setErrors(function(lastErrors){
            return {...lastErrors,
                password: undefined
            }
        })
        setGeneralError('')
    }, [password]);


    return (
        <div className="login-container">
            <h2 className="login-title">Anmeldung</h2>
            <form onSubmit={handleLogin}>
                <Input id="email" label="Email Adresse" error={errors.email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <Input id="password" label="Passwort" error={errors.password}
                       onChange={(event) => setPassword(event.target.value)} type="password"/>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {generalError && <div className="alert alert-danger">{generalError}</div>}

                <div className="button-div btn-left">
                    <div className="button third">
                        <button type="submit">Einloggen</button>
                    </div>
                </div>
                <div className="mt-3">
                    <p>Noch kein Mitglied? <Link id="mt" to="/signup">Registrieren</Link></p>
                    <p>Passwort vergessen? <Link id="mt2" to="/reset-password">Passwort zurücksetzen</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
