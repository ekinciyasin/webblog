import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Web Blog</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#kategorien">Kategorien</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#artikel">Artikel</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-success me-2" href="/login">Einloggen</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-success" href="/SignUp">Registrieren</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;