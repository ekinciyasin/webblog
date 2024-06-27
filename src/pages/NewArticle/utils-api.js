import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3005';

export const fetchArticles = async () => {
    const response = await axios.get('/articles');
    return response.data;
};

export const updateArticles = async (item) => {
    const response = await axios.post(`/articles`, item );
    return response.data;
};

export const deleteArticle = async (id) => {
    const response = await axios.delete(`/articles/${id}` );
    return response.data;
};

export const editArticles = async (id, item) => {
    const response = await axios.patch(`/articles/${id}`, item );
    return response.data;
};