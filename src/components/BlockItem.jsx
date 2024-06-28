import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const BlockItem = ({
                       blockId,
                       title,
                       url,
                       blockland,
                       blockDate,
                       blockText,
                       swap,
                       userRole,
                       handleDeleteArticle,
                       handleEditArticle,
                       id,
                       blockReiseTyp
                   }) => {
        function handleDelete() {
            handleDeleteArticle(id);
        }

        function handleEdit() {
            handleEditArticle(id);
        }

        const formattedDate = new Date(blockDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return (
            <div className="card" id="customCard">
                {swap ? (
                    <>
                        <div className="card-body" id="noswap">
                            <h5 className="card-title" id="card-title">{title}</h5>

                            {userRole === 'ADMIN' && (
                                <div className="block-edit-btn-container">
                                    <div onClick={handleEdit} className="edit-btn-div card-second-btn">Bearbeiten</div>
                                    <div onClick={handleDelete} className="delete-btn-div card-second-btn">Löschen</div>
                                </div>
                            )}
                            <div className="card-text">{blockText}</div>
                            <div className="card-date">{formattedDate}</div>
                            <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum Blogartikel
                                --></Link>
                        </div>
                        <div>
                            <img className="card-img-top" src={url} alt="Card image cap" id="noswap-pic"/>
                            <div className="blog-label-swap">
                                <div>{blockReiseTyp}</div>
                                <div>{blockland}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <img className="card-img-top" src={url} alt="Card image cap" id="swap"/>
                        <div className="blog-label-noswap">
                            <div>{blockReiseTyp}</div>
                            <div>{blockland}</div>
                        </div>
                        <div className="card-body" id="card-body">
                            <h5 className="card-title" id="card-title">{title}</h5>

                            {userRole === 'ADMIN' && (
                                <div className="block-edit-btn-container block-edit-btn-container-margin-left">
                                    <div onClick={handleEdit} className="edit-btn-div card-second-btn">Bearbeiten</div>
                                    <div onClick={handleDelete} className="delete-btn-div card-second-btn">Löschen</div>
                                </div>
                            )}

                            <div className="card-text">{blockText}</div>
                            <div className="card-date">{formattedDate}</div>
                            <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum Blogartikel
                                --></Link>
                        </div>
                    </>
                )}
                <Outlet/>
            </div>
        );
    }
;

export default BlockItem;
