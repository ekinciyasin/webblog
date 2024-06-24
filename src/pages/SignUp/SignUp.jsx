import React, {useEffect, useState} from 'react';
import {signUp} from "./api";
import Input from "./components/Input";



const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [apiProgress, setApiProgress] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({})
    const [generalError, setGeneralError] = useState('');

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
    }, [email]);

    const onSubmit =  (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setGeneralError('');
        signUp({username, email, password})
            .then((response) => {setSuccessMessage(response.data.message) })
            .catch((axiosError) => {
                if(axiosError.response?.data && axiosError.response.status === 400) {
                    setErrors(axiosError.response.data.validationErrors);
                }else{
                   setGeneralError('Ein unbekannter Fehler ist aufgetreten.')
                }
            })
            .finally(() => setApiProgress(false));
        setApiProgress(true)

    };

    return (
        <div className="login-container">
                    <h2  className="login-title">Registrieren</h2>
                    <form onSubmit={onSubmit}>
                        <Input id="username" label="Vollständiger Name" error={errors.username}  onChange={(event) => setUsername(event.target.value)}/>
                        <Input id="email" label="Email Adresse" error={errors.email}  onChange={(event) => setEmail(event.target.value)}/>
                        <Input id="password" label="Passwort" error={errors.password}  onChange={(event) => setPassword(event.target.value)}/>

                        <div className="form-group">
                            <label htmlFor="passwordRepeat">Passwort wiederholen</label>
                            <input  onChange={(event) => setPasswordRepeat(event.target.value)} type="password" className="form-control" id="passwordRepeat"
                                   placeholder="Passwort wiederholen"/>
                        </div>
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
