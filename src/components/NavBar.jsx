import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {AuthContext} from "../state/AuthenticationContext";

const NavBar = () => {
    const authState = useContext(AuthContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light" id="navbar">
                <div className="container navbar-container">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src="https://i.ibb.co/RDwKkQb/logo2.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" id="navbar-toggler"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {authState.role === 'ADMIN' && (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link a-categorien" href="/new-article">Neuen Artikel erstellen</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link btn a-categorien" href="/users">Benutzer</a>
                                    </li>
                                </>
                            )}
                            {authState.id !== 0 ? (
                                <>
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle bold-italic" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Hallo, {authState.username}
                                        </span>
                                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                            <li><a className="nav-link dropdown-item " href="/account-page">Zur Profilseite</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link a-categorien" onClick={authState.onLogoutSuccess} href="/">Ausloggen</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link a-categorien" href="/login">Einloggen</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link a-categorien" href="/signup">Registrieren</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
