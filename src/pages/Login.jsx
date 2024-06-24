import React, { useState } from 'react';
import './Login.css';
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        console.log('Giriş yapılıyor:', { username, email, password });
    };

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
