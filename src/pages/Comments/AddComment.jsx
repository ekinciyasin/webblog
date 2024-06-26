import React, {useState} from 'react';
import axios from "axios";

function AddComment(props) {
    const{username, blockId } = props;
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e) =>  {
        e.preventDefault();
        if (commentText.trim()) {
            const newComment = {
                id: Date.now(),
                userId: username,
                text: commentText,
                timestamp: new Date().toLocaleString()
            };

            try {
                const  response =  await  axios.get(`http://localhost:3005/articles?blockId=${blockId}`)
                const {id, blockKommentare} = response.data[0];
                setComments(blockKommentare);
                await axios.patch(`http://localhost:3005/articles/${id}`,  { blockKommentare: [newComment, ...comments]  });
                setComments([newComment, ...comments]);
                setCommentText('');
            } catch (error) {
                console.error("Yorum eklerken hata oluştu:", error);
            }

        }
    };
    return (
        <div className="mt-5">

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
                        style={{color: 'black'}}


                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Kommentar hinzufügen</button>
            </form>

        </div>
    );
}

export default AddComment;