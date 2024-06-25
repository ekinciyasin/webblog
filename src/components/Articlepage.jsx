import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import blocks from "../db.json";

const ArticlePage = (props) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };


    const { blockId } = useParams();
    const block = blocks.find((b) => b.blockId === blockId);


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
                    <div className="">{block.blockText}</div>
                </div>
            </div>

            <div className="mt-5">
                <h5>Kommentare</h5>
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
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Kommentar hinzufügen</button>
                </form>

                <ul className="list-group mt-3">
                    {comments.map((comment, index) => (
                        <li key={index} className="list-group-item">
                            {comment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ArticlePage;


