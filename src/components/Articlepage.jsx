import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import blocks from "../db.json";
import Comments from "../pages/Comments/Comments";
import axios from "axios";
import AddComment from "../pages/Comments/AddComment";
import CommentsSection from "../pages/Comments/CommentsSection";

const ArticlePage = ({username}) => {


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
            <CommentsSection username={username} blockId={blockId}/>
            {/*<AddComment username={username} blockId={blockId}/>*/}
            </div>

        </div>
    );
};

export default ArticlePage;
