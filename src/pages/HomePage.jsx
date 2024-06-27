import React from 'react';
import '../App.css';
import Login from "./Login/Login";
import BlocksList from "../components/BlocksList";

function HomePage({ userRole }) {
    return (
        <div className="homePageMainContainer content-container">
            <BlocksList userRole={userRole} />
        </div>
    )
}

export default HomePage;

