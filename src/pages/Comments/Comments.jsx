import React, { useState } from 'react';
import './Comments.css'; // Import der CSS-Datei

const Comments = ({ comments }) => { // Kommentare als Prop
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="comments-container">
            {currentComments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                        <h3>{comment.userId}</h3> {/* Benutzernamen */}
                        <span className="comment-date">{comment.timestamp}</span> {/* Zeitstempel */}
                    </div>
                    <p>{comment.text}</p> {/* Kommentar */}
                </div>
            ))}
            <div className="pagination">
                {[...Array(Math.ceil(comments.length / commentsPerPage)).keys()].map(number => ( // Seitenzahlen
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Comments;
