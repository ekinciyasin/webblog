import React, { useState } from 'react';
import './Comments.css';

const commentsData = [
    { title: 'Comment 1', text: 'This is the first comment', date: '2023-01-01', username: 'user1' },
    { title: 'Comment 2', text: 'This is the second comment', date: '2023-01-02', username: 'user2' },
    // Daha fazla yorum ekleyebilirsin
];

const Comments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    // Yorumları sayfaya göre dilimle
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = commentsData.slice(indexOfFirstComment, indexOfLastComment);

    // Sayfa değiştirme fonksiyonu
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="comments-container">
            {currentComments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <h3>{comment.title}</h3>
                        <span className="comment-date">{comment.date}</span>
                    </div>
                    <p>{comment.text}</p>
                    <p><strong>{comment.username}</strong></p>
                </div>
            ))}
            <div className="pagination">
                {[...Array(Math.ceil(commentsData.length / commentsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Comments;
