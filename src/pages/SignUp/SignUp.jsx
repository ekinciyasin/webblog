import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [apiProgress, setApiProgress] = useState(false)
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        setSuccessMessage('');

        axios.post('/api/v1/users', {event: {username, email, password}  })
            .then((response) => {setSuccessMessage(response.data.message) })
            .finally(() => setApiProgress(false));
        setApiProgress(true)

    };

    return (
        <div className="login-container">
                    <h2  className="login-title">Registrieren</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Vollständiger Name</label>
                            <input onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" id="name" placeholder="Name eingeben"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Adresse</label>
                            <input  onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="email" placeholder="Email eingeben"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Passwort</label>
                            <input  onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="password" placeholder="Passwort"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordRepeat">Passwort wiederholen</label>
                            <input  onChange={(event) => setPasswordRepeat(event.target.value)} type="password" className="form-control" id="passwordRepeat"
                                   placeholder="Passwort wiederholen"/>
                        </div>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <button disabled={apiProgress || (!password || password !== passwordRepeat)} type="submit" className="btn btn-success">
                            {apiProgress && <span className="spinner-border spinner-border-sm" role="status" aria-hidden=""></span>}
                            Registrieren</button>
                    </form>
        </div>
    );
};

export default SignUp;
