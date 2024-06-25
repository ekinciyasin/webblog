import React, {useEffect, useMemo, useState} from 'react';
import {signUp, signUpUser} from "./api";
import Input from "../../components/Input";
import {login, loginUser} from "../Login/api";
import {useNavigate} from "react-router-dom";
import {getUser} from "../../api/ApiCalls";




const SignUp = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [apiProgress, setApiProgress] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();

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
        //
        // with API -springboot
        // signUp({username, email, password})
        //     .then((response) => {setSuccessMessage(response.data.message) })
        //     .catch((axiosError) => {
        //         if(axiosError.response?.data && axiosError.response.status === 400) {
        //             setErrors(axiosError.response.data.validationErrors);
        //         }else{
        //            setGeneralError('Ein unbekannter Fehler ist aufgetreten.')
        //         }
        //     })
        //     .finally(() => setApiProgress(false));
        // setApiProgress(true)
        //

        // with DummyData

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
            newUser = await signUp({ username, email, password });
            await login(email, password);
            onLogin(newUser);
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
                        <Input id="username" label="Vollständiger Name" error={errors.username}  onChange={(event) => setUsername(event.target.value)}/>
                        <Input id="email" label="Email Adresse" error={errors.email}  onChange={(event) => setEmail(event.target.value)}/>
                        <Input id="password" label="Passwort" error={errors.password}  onChange={(event) => setPassword(event.target.value)} type="password"/>
                        <Input id="passwordRepeat" label="Passwort" error={passordRepeatError}  onChange={(event) => setPasswordRepeat(event.target.value)} type="password"/>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {generalError && <div className="alert alert-danger">{generalError}</div>}
                        <button disabled={apiProgress || (!password || password !== passwordRepeat)} type="submit" className="btn btn-success">
                            {apiProgress && <span className="spinner-border spinner-border-sm" role="status" aria-hidden=""></span>}
                            Registrieren</button>
                    </form>
        </div>
    );
};

export default SignUp;
