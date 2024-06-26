import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const BlockItem = ({blockId, title, url, blockland, blockDate, blockText, swap, blockbeschreibung, userRole}) => {
    return (
        <div className="card" id="customCard">
            {swap ? (
                <>
                    <div className="card-body" id="noswap">
                        <h5 className="card-title" id="card-title">{title}</h5>

                        {userRole === 'ADMIN' && (
                            <div className="block-edit-btn-container">
                                <button className="block-edit-btn">bearbeiten</button>
                                <button className="block-edit-btn">löschen</button>

                            </div>
                        )}
                        <div className="card-text">{blockbeschreibung}</div>
                        <div className="card-date">{blockDate}</div>
                        <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum Blogartikel
                            --></Link>
                    </div>
                    <img className="card-img-top" src={url} alt="Card image cap" id="noswap-pic"/>
                </>
            ) : (
                <>
                    <img className="card-img-top" src={url} alt="Card image cap" id="swap"/>
                    <div className="card-body" id="card-body">
                        <h5 className="card-title" id="card-title">{title}</h5>

                        {userRole === 'ADMIN' && (
                            <div className="block-edit-btn-container block-edit-btn-container-margin-left">
                                <button className="block-edit-btn">bearbeiten</button>
                                <button className="block-edit-btn">löschen</button>
                            </div>
                        )}

                        <div className="card-text">{blockbeschreibung}</div>
                        <div className="card-date">{blockDate}</div>
                        <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum Blogartikel
                            --></Link>
                    </div>
                </>
            )}
            <Outlet/>
        </div>
    );
};

export default BlockItem;
