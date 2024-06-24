import React, { useState } from 'react';

const ArticlePage = () => {
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

    return (
        <div className="container mt-5">
            <div className="card">
                <img
                    className="card-img-top"
                    src="https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_1280.jpg"
                    alt="Card image cap"
                    style={{ width: '40rem', margin: '0 auto' }}
                />
                <div className="card-body">
                    <h5 className="card-title">Wandern: Ein Abenteuer in der Natur</h5>
                    <p className="card-text">
                        Wandern ist eine der beliebtesten Freizeitaktivitäten weltweit. Es verbindet körperliche Bewegung mit der Erkundung atemberaubender Landschaften und bietet eine willkommene Auszeit vom hektischen Alltag. Egal ob in den Bergen, an Küsten oder durch dichte Wälder – Wandern ermöglicht es, die Natur hautnah zu erleben und gleichzeitig etwas für die Gesundheit zu tun.
                        <br/><br/>
                        Wandern stärkt das Herz-Kreislauf-System, verbessert die Ausdauer und fördert die Muskelkraft. Es ist eine gelenkschonende Sportart, die sich für Menschen aller Altersgruppen eignet. Zudem hat das Wandern positive Effekte auf die mentale Gesundheit: Die frische Luft und die beruhigende Umgebung der Natur reduzieren Stress und können helfen, den Kopf frei zu bekommen.
                        <br/><br/>
                        Wandern ist mehr als nur eine körperliche Aktivität – es ist eine Möglichkeit, sich mit der Natur zu verbinden und innere Ruhe zu finden. Ob allein, mit Freunden oder der Familie: Die Abenteuer und Eindrücke, die man beim Wandern sammelt, sind unbezahlbar und bleiben oft ein Leben lang in Erinnerung. Pack deinen Rucksack und entdecke die Welt auf Schusters Rappen!
                    </p>
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
