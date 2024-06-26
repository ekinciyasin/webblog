import React, {useEffect, useState} from 'react';
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import CommentsSection from "../Comments/CommentsSection";
import sanitizeHtml from 'sanitize-html';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}


const ArticlePage = () => {
    const [article, setArticle] = useState({}); // Geändert: Initialisierung auf null
    const [status, setStatus] = useState(Status.IDLE);
    const [responseMessage, setResponseMessage] = useState('');
    const { blockId } = useParams();


    async function getArticles() {
        try {
            const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
            if (response.data.length > 0) { // Hinzugefügt: Überprüfung, ob Artikel gefunden wurden
                setArticle(response.data[0]);
                setStatus(Status.RESOLVED);
            } else {
                setResponseMessage("Es wurden keine Artikel gefunden!");
                setStatus(Status.REJECTED); // Hinzugefügt: Setzen des Status auf REJECTED
            }
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

    if (status === Status.PENDING) { // Hinzugefügt: Überprüfung auf PENDING
        return <div>Loading...</div>;
    }

    if (status === Status.REJECTED) { // Hinzugefügt: Überprüfung auf REJECTED und Umleitung
        return <Navigate to="/not-found" />;
    }


    const sanitizedContent = sanitizeHtml(article.blockText, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
    });

    const formattedDate = new Date(article.blockDatum).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <div className="container mt-5" id="mt-5">
            {article && ( // Geändert: Überprüfung, ob Artikel vorhanden ist
                <>
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
                    <CommentsSection blockId={blockId}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default ArticlePage;
