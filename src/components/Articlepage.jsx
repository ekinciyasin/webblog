import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import blocks from "../db.json";
import Comments from "../pages/Comments/Comments"; // Import der Comments-Komponente von Yasin

const ArticlePage = ({ username }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                userId: username,
                text: commentText,
                timestamp: new Date().toLocaleString()
            };
            setComments([newComment, ...comments]);
            setCommentText('');
        }
    };

    const { blockId } = useParams(); // Holen der blockId aus den URL-Parametern
    const block = blocks.find((b) => b.blockId === blockId); // Finden des entsprechenden Blocks aus den Daten

    return (
        <div className="container mt-5" id="mt-5">
            <div className="card" id="customArticleContainer">
                <img
                    className="card-img-top"
                    src={block.blockBild}
                    alt="Card image cap"
                    style={{ width: '40rem', margin: '0 auto' }}
                />
                <div className="">
                    <div className="articleTitle">
                        <h2 className="card-title">{block.blockTitle}</h2>
                        <div>{block.blockDatum}</div>
                    </div>
                    <div className="">{block.blockText}</div>
                </div>
            </div>
            <div className="mt-5">
                <Comments comments={comments} /> {/* Comments-Komponente von Yasin */}
            </div>
            <div className="mt-5">
                <h5>Kommentar schreiben</h5>
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
                            style={{ color: 'black' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Kommentar hinzufügen</button>
                </form>
            </div>
        </div>
    );
};

export default ArticlePage;
