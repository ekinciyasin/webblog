import React, {useEffect, useState} from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import {signUp} from "../SignUp/api";
import {login, loginUser} from "./api";
import Input from "../../components/Input";





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
        let user;
        try {
            user = await login(email, password);
        } catch (error) {
            setGeneralError('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
            return;
        }

        if (user !== null) {
            onLogin(user);
            navigate("/");
        } else {
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
                <Input id="email" label="Email Adresse" error={errors.email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <Input id="password" label="Passwort" error={errors.password}
                       onChange={(event) => setPassword(event.target.value)} type="password"/>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {generalError && <div className="alert alert-danger">{generalError}</div>}
                <div className="button-div btn-left">
                    <a className="button third">
                        <button type="submit">Einloggen</button>
                        <span></span></a>
                </div>

                {/*<button type="submit" className="btn btn-success">Einloggen</button>*/}
                <div className="mt-3">
                    <p>Noch kein Mitglied? <Link to="/signup">Registrieren</Link></p>
                    <p>Passwort vergessen? <Link to="/reset-password">Passwort zurücksetzen</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
