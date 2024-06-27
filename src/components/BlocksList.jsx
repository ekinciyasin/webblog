import React, {useEffect, useState} from 'react';
import BlockItem from "./BlockItem";
import Filter from "./Filter";
import {deleteArticle, editArticles, fetchArticles} from "../pages/NewArticle/utils-api";
import {Slide, toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pages/NewArticle/toastify.css'
import ArticleEdition from "../pages/NewArticle/ArticleEdition";

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

const BlocksList = ({userRole}) => {
    const [selectedTyp, setSelectedTyp] = useState("all");
    const [selectedLand, setSelectedLand] = useState("all");
    const [articles, setArticles] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [status, setStatus] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [articleContent, setArticleContent] = useState(null);



    function setSelectedTypHandler(value) {
        setSelectedTyp(value);
    }

    function setSelectedLandHandler(value) {
        setSelectedLand(value);
    }

    async function getArticles() {
        try {
            const data = await fetchArticles();
            setArticles(data);
            setStatus(Status.RESOLVED)
        } catch (error) {
            console.error('Error fetching articles:', error);
            setResponseMessage("Es wurden keine Artikel gefunden!");
            setStatus(Status.REJECTED)
        }
    }

    useEffect(() => {
        setStatus(Status.PENDING);
        getArticles();
    }, []);



    async function handleDeleteArticle(id) {
        const newArticles = articles.filter(article => article.id !== id);
        try {
            await deleteArticle(id);
            setArticles(newArticles);
            toast.success("Der Artikel wurde erfolgreich gelöscht!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        } catch (error) {
            console.error('Error delete articles:', error);
            toast.error("Der Artikel konnte nicht gelöscht werden!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        }

    }



    function handleEditArticle(id) {
        const currentArticleContent = articles.find(article => article.id === id);
        setArticleContent(currentArticleContent);
        setShowEditor(true);
    }

     async function handleEditorOnSubmit(id, response) {
         // console.log('response ' + id + response)
         try {
             const newResponse = await editArticles(id, response);
             const articleIndex = articles.findIndex(article => article.id === id);
             const newArticles = [...articles];
             newArticles.splice(articleIndex,1,newResponse);
             setArticles(newArticles);
             toast.success("Der Artikel wurde erfolgreich bearbeitet!", {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "dark",
                 transition: Slide,
             });
         } catch (error) {

             toast.error("Der Artikel konnte nicht bearbeitet werden!", {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "dark",
                 transition: Slide,
             });
             console.error('Error posting article:', error);
         }

         setShowEditor(false);

    }

    if (status === Status.PENDING) {
        return <div><p>Loading....</p></div>
    }

    if (status === Status.REJECTED) {
        return <div><p>{responseMessage}</p></div>
    }

    if (status === Status.RESOLVED) {
        return (
            <div>
                <div className="blocks-container">
                    <Filter
                        setSelectedTypHandler={setSelectedTypHandler}
                        setSelectedLandHandler={setSelectedLandHandler}
                    />
                    {articles.filter((blog) => selectedTyp === "all" ? blog !== null : blog.blockReiseTyp.toLowerCase() === selectedTyp).filter((blog) => selectedLand === "all" ? blog !== null : blog.blockLand === selectedLand).map((b, index) => (
                        <div key={b.blockId}>
                            <BlockItem
                                handleDeleteArticle={handleDeleteArticle}
                                handleEditArticle={handleEditArticle}
                                id={b.id}
                                userRole={userRole}
                                title={b.blockTitle}
                                url={b.blockBild}
                                blockland={b.blockLand}
                                blockDate={b.blockDatum}
                                blockText={b.blockText}
                                blockId={b.blockId}
                                blockbeschreibung={b.blockBeschreibung ? b.blockBeschreibung : ''}
                                swap={index % 2 === 1} // Pass swap prop to indicate if the positions should be swapped
                            />
                        </div>
                    ))}
                    {showEditor && <ArticleEdition articleContent={articleContent} handleEditorOnSubmit={handleEditorOnSubmit}/>}
                    <ToastContainer/>
                </div>
            </div>
        );
    }
};

export default BlocksList;
