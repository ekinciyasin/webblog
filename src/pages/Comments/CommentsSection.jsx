import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Comments from "./Comments";
import AddComment from "./AddComment";


const CommentsSection = (props) => {
    const {blockId} = props;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/articles?blockId=${blockId}`);
                const { blockKommentare } = response.data[0];
                setComments(blockKommentare || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [blockId]);

    return (
        <div>
            <Comments  blockId={blockId} comments={comments} setComments={setComments} />
            <AddComment blockId={blockId} setComments={setComments} comments={comments} />
        </div>
    );
};

export default CommentsSection;
