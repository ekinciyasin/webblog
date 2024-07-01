import React, {useContext, useEffect, useMemo, useState} from 'react';
import {signUp} from "./api";
import Input from "../../components/Input";
import {login} from "../Login/api";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../../state/AuthenticationContext";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [apiProgress, setApiProgress] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();
    let authState = useContext(AuthContext);
    useEffect(() => {
        setErrors(function(lastErrors){
            return {...lastErrors,
            username: undefined
            }
        })
    }, [username]);

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
    }, [password]);

    const passordRepeatError = useMemo(() => {
            if(password && passwordRepeat!== password){
             return  'Passwörter stimmen nicht überein.';
            }else{
                return "";
            }
    }, [password,passwordRepeat]);

    const onSubmit =  async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setGeneralError('');

        let newErrors = {};
        if (username.length < 5 || username.length > 20) {
            newErrors.username = "Benutzername muss zwischen 5 und 20 Zeichen sein.";

        }
        if (!email.includes('@')) {
            newErrors.email = "E-Mail-Adresse muss ein '@' Zeichen enthalten.";

        }
        if (password.length < 4 || password.length > 20) {
            newErrors.password = "Passwort muss zwischen 4 und 20 Zeichen sein.";

        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;

        }
        let newUser;
        try {
            let role='USER';
            newUser = await signUp({ username, email, password ,role});
            await login(email, password);
            authState.onLoginSuccess(newUser);
            navigate("/");
        } catch (error) {
            setGeneralError(error.message || 'Registrierung fehlgeschlagen.');
        } finally {
            setApiProgress(false);
        }


    };

    return (
        <div className="login-container">
                    <h2  className="login-title">Registrieren</h2>
            <form onSubmit={onSubmit}>
                <Input id="username" label="Vollständiger Name" error={errors.username}
                       onChange={(event) => setUsername(event.target.value)}/>
                <Input id="email" label="Email Adresse" error={errors.email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <Input id="password" label="Passwort" error={errors.password}
                       onChange={(event) => setPassword(event.target.value)} type="password"/>
                <Input id="passwordRepeat" label="Passwort Wiederholung" error={passordRepeatError}
                       onChange={(event) => setPasswordRepeat(event.target.value)} type="password"/>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {generalError && <div className="alert alert-danger">{generalError}</div>}


                {/*<button disabled={apiProgress || (!password || password !== passwordRepeat)} type="submit"*/}
                {/*        className="btn btn-success">*/}
                {/*    {apiProgress &&*/}
                {/*        <span className="spinner-border spinner-border-sm" role="status" aria-hidden=""></span>}*/}
                {/*    Registrieren*/}
                {/*</button>*/}

                <div disabled={apiProgress || (!password || password !== passwordRepeat)} className="button-div btn-left" onClick={onSubmit}>
                    <a className="button third">
                        <button type="submit">Registrieren</button>
                        <span className="span"></span></a>
                    {apiProgress &&
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden=""></span>}
                </div>
            </form>
        </div>
    );
};

export default SignUp;
