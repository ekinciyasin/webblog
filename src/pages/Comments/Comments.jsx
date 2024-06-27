import React, { useState } from 'react';
import './Comments.css';

const Comments = ({ comments, setComments }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 3;

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="comments-container">
            <h5>Kommentare</h5>
            {currentComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <h3>{comment.title}</h3>
                        <span className="comment-date">{comment.timestamp}</span>
                    </div>
                    <p>{comment.text}</p>
                    <p><strong>{comment.userId}</strong></p>
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
