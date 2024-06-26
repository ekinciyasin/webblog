import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const NavBar = ({ isLoggedIn, username, userRole, onLogout }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light" id="navbar">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src="https://i.ibb.co/RDwKkQb/logo2.png"
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" id="navbar-toggler"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
{/*                            <li className="nav-item">
                                <a className="nav-link  a-categorien" href="#kategorien">Kategorien </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  a-categorien"  href="#artikel">Artikel </a>
                            </li>*/}
                            {userRole === 'ADMIN' && (
                               <>
                                 <li className="nav-item">
                                    <a className="nav-link  a-categorien" href="/new-article">Neuen Artikel erstellen </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn a-categorien" href="/users">Benutzer </a>
                                </li>
                             </>
                            )}
                            <li className="nav-item">
                                <a className="nav-link" href="#artikel"></a>
                            </li>
                            {isLoggedIn && username ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link bold-italic">Hallo, {username}</span>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link a-categorien" onClick={onLogout} href="/users">Ausloggen </a>
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
