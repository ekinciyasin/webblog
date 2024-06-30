import React, {useContext, useState} from 'react';
import axios from "axios";
import './Comments.css';
import {AuthContext} from "../../state/AuthenticationContext";
import Modal from "../NewArticle/Modal/Modal";
import {Slide, toast, ToastContainer} from "react-toastify";

const Comments = ({comments, setComments, blockId}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');
    const commentsPerPage = 3;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const authContext = useContext(AuthContext);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDeleteId, setCommentToDeleteId] = useState(null);


    const handleDelete = async () => {
        if (commentToDeleteId !== null) {
            try {
                const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
                const {id, blockKommentare} = response.data[0];
                const updatedComments = blockKommentare.filter(comment => comment.id !== commentToDeleteId);
                await axios.patch(`http://localhost:3005/articles/${id}`, {blockKommentare: updatedComments});
                setComments(updatedComments);
            } catch (error) {
                console.error("Error deleting comment:", error);
                toast.error("Der Kommentar konnte nicht gelöscht werden!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
        }
        setIsModalOpen(false);
    };

    const handleEdit = (comment) => {
        setEditingComment(comment.id);
        setEditText(comment.text);
    };

    const handleEditChange = (e) => {
        setEditText(e.target.value);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
            const {id, blockKommentare} = response.data[0];
            const updatedComments = blockKommentare.map(comment =>
                comment.id === editingComment ? {...comment, text: editText} : comment
            );
            await axios.patch(`http://localhost:3005/articles/${id}`, {blockKommentare: updatedComments});
            setComments(updatedComments);
            setEditingComment(null);

        } catch (error) {
            console.error("Error editing comment:", error);
            toast.error("Der Kommentar konnte nicht bearbeitet werden!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        }
    };


    return (
        <div className="comments-container">
            <h5>Kommentare</h5>
            {currentComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <h3>{comment.title}</h3>
                        <span className="comment-date">{comment.timestamp}</span>
                    </div>
                    {editingComment === comment.id ? (
                        <div className="comment-footer">
                            <form onSubmit={handleEditSubmit}>
                                <textarea
                                    value={editText}
                                    onChange={handleEditChange}
                                    rows="3"
                                    required
                                    style={{color: 'black'}}
                                />

                                <div className="button-div btn-left" onClick={handleEditSubmit}>
                                    <a className="button third">
                                        <button>Speichern</button>
                                        <span className="span"></span></a>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <p>{comment.text}</p>
                            <div className="comment-footer">
                                <p><strong>{comment.user}</strong></p>
                                {(comment.user === authContext.username || authContext.role === 'ADMIN') && (
                                    <div className="block-edit-btn-container flex-end">
                                        {comment.user === authContext.username && (

                                            <div onClick={() => handleEdit(comment)}
                                                 className="edit-btn-div card-second-btn font17">Bearbeiten</div>
                                        )}
                                        <div onClick={() => {
                                            setCommentToDeleteId(comment.id);
                                            setIsModalOpen(true)
                                        }}
                                             className="delete-btn-div card-second-btn font17">Löschen
                                        </div>
                                    </div>
                                )}
                            </div>

                        </>
                    )}
                </div>
            ))}

            <Modal width={'20vw'} bgColor={'#0B1D26'} isOpen={isModalOpen}
                   onClose={() => setIsModalOpen(false)}>
                <p style={{textAlign: 'center'}}>Wollen Sie den Kommentar wirklich
                    löschen?</p>
                <div
                    className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-primary "
                            onClick={() => handleDelete()}>Ja
                    </button>
                    <button type="button" className="btn btn-secondary "
                            onClick={() => setIsModalOpen(false)}>Nein
                    </button>
                </div>
            </Modal>
            <ToastContainer />

            <nav>
                <ul className="pagination">
                    {[...Array(Math.ceil(comments.length / commentsPerPage)).keys()].map(number => (
                        <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <div onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Comments;

