import React from 'react';
import { Link } from "react-router-dom";
import notFoundImage from '../assets/404-illustration.jpg';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img src={notFoundImage} alt="404 Not Found" style={{ maxWidth: '60%', height: 'auto' }} />
            <h1>Keine Seite gefunden.</h1>
            <p>Hier kommst du zurück zur Startseite:</p>
            <div>
                <Link to='/' style={{ margin: '0 10px' }}>Home</Link>
            </div>
        </div>
    )
}
