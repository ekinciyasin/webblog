import React from 'react';
import '../App.css';
import Login from "./Login";
import BlocksList from "../components/BlocksList";

function HomePage() {

    return (
        <div className="homePageMainContainer">
            <BlocksList/>
        </div>
    )
}


export default HomePage;
