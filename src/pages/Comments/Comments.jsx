import React, { useState } from 'react';
import './Comments.css'; // Import der CSS-Datei

const Comments = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="comments-container">
            {currentComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <h3>{comment.user}</h3> {/* Benutzername */}
                        <span className="comment-date">{comment.date}</span> {/* Zeitstempel */}
                    </div>
                    <p>{comment.kommentare}</p> {/* Kommentar */}
                </div>
            ))}
            <div className="pagination">
                {[...Array(Math.ceil(comments.length / commentsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Comments;
