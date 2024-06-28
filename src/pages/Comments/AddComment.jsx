import React, { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const AddComment = ({ username, blockId, setComments, comments }) => {
    const [commentText, setCommentText] = useState('');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: Date.now(),
                user: username,
                text: commentText,
                timestamp: new Date().toLocaleString()
            };

            try {
                const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
                const { id, blockKommentare } = response.data[0];
                const updatedComments = [newComment, ...(blockKommentare || comments)];
                await axios.patch(`http://localhost:3005/articles/${id}`, { blockKommentare: updatedComments });
                setComments(updatedComments);
                setCommentText('');
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    return (
        <div className="mt-5">
            {isLoggedIn && (
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Kommentar schreiben</label>
                        <textarea
                            id="comment"
                            className="form-control"
                            value={commentText}
                            onChange={handleCommentChange}
                            rows="3"
                            required
                            style={{color: 'black'}}
                        ></textarea>
                    </div>


                    {/*<button type="submit" className="btn btn-primary">Kommentar hinzufügen</button>*/}

                    <div className="button-div btn-left" onClick={handleCommentSubmit}>
                        <div className="button third">
                        <button>
                            Submit
                        </button>
                        <span className="span"></span>
                        </div>
                </div>

                </form>
                )}
            {!isLoggedIn && (
                <div className="text-center p-3">
                    <p>Bitte loggen Sie sich ein, um einen Kommentar abzugeben..</p>
                    <Link to="/login">Einloggen</Link>
                </div>

            )}
        </div>
    );
};

export default AddComment;
