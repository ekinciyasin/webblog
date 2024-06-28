import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import blocks from "../db.json";
import Comments from "../pages/Comments/Comments";
import axios from "axios";
import AddComment from "../pages/Comments/AddComment";
import CommentsSection from "../pages/Comments/CommentsSection";
import {fetchArticles} from "../pages/NewArticle/utils-api";
import sanitizeHtml from 'sanitize-html';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}


const ArticlePage = (props) => {
    const {userRole,username } = props;
    const [article, setArticle] = useState([]);
    const [status, setStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const { blockId } = useParams();



    async function getArticles() {
        try {
            const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
            setArticle(response.data[0]);
            setStatus(Status.RESOLVED)
        } catch (error) {
            console.error('Error fetching article:', error);
            setResponseMessage("Es wurden keine Artikel gefunden!");
            setStatus(Status.REJECTED)
        }

    }


    useEffect(() => {
        setStatus(Status.PENDING);
        getArticles();
    }, []);



    const sanitizedContent = sanitizeHtml(article.blockText, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
    });

    const formattedDate = new Date(article.blockDatum).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <div className="container mt-5" id="mt-5">
            <div className="card" id="customArticleContainer">
                <img
                    className="card-img-top"
                    src={article.blockBild}
                    alt="Card image cap"
                    style={{ width: '40rem', margin: '0 auto' }}
                />
                <div className="">
                    <div className="articleTitle">
                        <h2 className="card-title">{article.blockTitle}</h2>
                        <div>{formattedDate}</div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: sanitizedContent}}/>
                    <div dangerouslySetInnerHTML={{__html: sanitizedContent}}/>
                </div>
            </div>
            <div className="mt-5">
            <CommentsSection userRole={userRole} username={username} blockId={blockId}/>
            </div>

        </div>
    );
};

export default ArticlePage;
