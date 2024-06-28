import React, {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import Modal from "../pages/NewArticle/Modal/Modal";
import sanitizeHtml from "sanitize-html";

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
        const [isModalOpen, setIsModalOpen] = useState(false);

        function handleDelete() {
            setIsModalOpen(true);
        }

        function handleEdit() {
            handleEditArticle(id);
        }

        const formattedDate = new Date(blockDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const sanitizedContent = sanitizeHtml(blockText, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
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

                            <div className="card-text" dangerouslySetInnerHTML={{__html: sanitizedContent}}/>
                            <div className="card-date">{formattedDate}</div>
                            <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum
                                Blogartikel
                                --></Link>
                        </div>
                        <div className="img-card-container" id="noswap-pic">
                            <img className="img-card" src={url} alt="Card image cap" id="noswap-pic"/>
                            <div className="blog-label-swap">
                                {blockReiseTyp.split(', ').map((item, index) => (<div key={index}>
                                    {item}
                                </div>))}
                                <div>{blockland}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    <div className="img-card-container">
                        <img className="img-card" src={url} alt="Card image cap" id="swap"/>
                        <div className="blog-label-noswap">
                            {blockReiseTyp.split(', ').map((item, index) => (<div key={index}>
                                {item}
                            </div>))}
                            <div>{blockland}</div>
                        </div>
                    </div>
                        <div className="card-body" id="card-body">
                            <h5 className="card-title" id="card-title">{title}</h5>

                            {userRole === 'ADMIN' && (
                                <div className="block-edit-btn-container block-edit-btn-container-margin-left">
                                    <div onClick={handleEdit} className="edit-btn-div card-second-btn">Bearbeiten</div>
                                    <div onClick={handleDelete} className="delete-btn-div card-second-btn">Löschen</div>
                                </div>
                            )}
                            <div className="card-text" dangerouslySetInnerHTML={{__html: sanitizedContent}}/>
                            <div className="card-date">{formattedDate}</div>
                            <Link to={`${blockId}`} className="btn btn-primary" id="customBtnBlockItem">Zum Blogartikel
                                --></Link>
                        </div>
                    </>
                )}
                <Modal width={'20vw'} bgColor={'#0B1D26'} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <p style={{textAlign: 'center'}}>Wollen Sie den Artikel wirklich löschen?</p>
                    <div className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                        <button type="button" className="btn btn-primary " onClick={() => handleDeleteArticle(id)}>Ja
                        </button>
                        <button type="button" className="btn btn-secondary " onClick={() => setIsModalOpen(false)}>Nein
                        </button>
                    </div>

                </Modal>

                <Outlet/>
            </div>
        );
    }
;

export default BlockItem;
