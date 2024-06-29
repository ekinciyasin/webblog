import React, {useContext, useState} from 'react';
import axios from "axios";
import './Comments.css';
import {AuthContext} from "../../state/AuthenticationContext";

const Comments = ({ comments, setComments,  blockId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');
    const commentsPerPage = 3;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const authContext = useContext(AuthContext);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = async (commentId) => {
        try {
            const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
            const { id, blockKommentare } = response.data[0];
            const updatedComments = blockKommentare.filter(comment => comment.id !== commentId);
            await axios.patch(`http://localhost:3005/articles/${id}`, { blockKommentare: updatedComments });
            setComments(updatedComments);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
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
            const { id, blockKommentare } = response.data[0];
            const updatedComments = blockKommentare.map(comment =>
                comment.id === editingComment ? { ...comment, text: editText } : comment
            );
            await axios.patch(`http://localhost:3005/articles/${id}`, { blockKommentare: updatedComments });
            setComments(updatedComments);
            setEditingComment(null);
        } catch (error) {
            console.error("Error editing comment:", error);
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
                                    style={{ color: 'black' }}
                                />
                                <button type="submit" className="btn btn-primary">Speichern</button>
                            </form>

                        </div>
                    ) : (
                        <>
                            <p>{comment.text}</p>
                            <div className="comment-footer">
                                <p><strong>{comment.user}</strong></p>
                                {(comment.user === authContext.username || authContext.role === 'ADMIN') && (
                                    <div className="comment-buttons">
                                        {comment.user === authContext.username && (
                                            <button onClick={() => handleEdit(comment)} className="btn btn-secondary">Bearbeiten</button>
                                        )}
                                        <button onClick={() => handleDelete(comment.id)} className="btn btn-danger">Löschen</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
            <nav>
                <ul className="pagination">
                    {[...Array(Math.ceil(comments.length / commentsPerPage)).keys()].map(number => (
                        <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Comments;
