import React from 'react';
import { Link } from 'react-router-dom';

const BlockItem = () => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_1280.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Wandern: Ein Abenteuer in der Natur</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/article" className="btn btn-primary">Zum Blogartikel</Link>
            </div>
        </div>
    );
};

export default BlockItem;
