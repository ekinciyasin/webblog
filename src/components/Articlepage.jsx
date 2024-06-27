import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import blocks from "../db.json";
import Comments from "../pages/Comments/Comments";
import axios from "axios";

const ArticlePage = ({ username }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { blockId } = useParams();

    async function getArticles() {
        try {
            const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
            console.log(response.data);
            if (response.data.length > 0) {
                console.log('Kommentare:', response.data[0].blockKommentare);
                setComments(response.data[0].blockKommentare);
            } else {
                console.log('Keine Artikel gefunden');
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    useEffect(() => {
        getArticles();
    }, [blockId]);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        const newComment = {
            id: comments.length + 1,
            user: username,
            kommentare: commentText,
            date: new Date().toLocaleString(),
        };

        try {
            const response = await axios.put(`http://localhost:3005/articles/${blockId}`, {
                blockKommentare: [...comments, newComment]
            });

            if (response.status === 200) {
                setComments([...comments, newComment]);
                setCommentText('');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

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
                </div>
            </div>
            <div className="mt-5">
                <Comments comments={comments} />
            </div>
            <div className="mt-5">
                <h5>Kommentar schreiben</h5>
                {username ? (
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
                ) : (
                    <p>Bitte loggen Sie sich ein, wenn Sie einen Kommentar schreiben möchten.</p>
                )}
            </div>
        </div>
    );
};

export default ArticlePage;
