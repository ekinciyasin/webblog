import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import './AdminPage.css';
import axios from "axios";
// import './db_1.js';
// import {db} from "./db_1";

const AdminPage = () => {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState('');
    const [category, setCategory] = useState([]);
    const [picURL, setPicURL] = useState('');
    const [articles, setArticles] = useState([]);
    ///-------->

    const [responseMessage, setResponseMessage] = useState('');

    async function getUser() {
        try {
            const response = await axios.get("http://localhost:3005/articles");
            setArticles(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    const handleApi = async (e) => {
            e.preventDefault();
            const username = "Pit";
            const role = 'ADMIN'
            const id = uuidv4();
            try {
                const response = await axios.post('http://localhost:3005/users', {
                    id,
                    username,

                });
                setResponseMessage('Article posted successfully!');
                console.log('Response:', response.data);
            } catch (error) {
                setResponseMessage('Failed to post article');
                console.error('Error posting article:', error);
            }
        };






    const options = [
        { value: 'Kultur', label: 'Kultur' },
        { value: 'Safari', label: 'Safari' },
        { value: 'Trekking', label: 'Trekking' },
    ];


    function handleOnSubmit(evt) {
        evt.preventDefault();
        let error = false;

        setTitleError('');
        setDescriptionError('');
        setCountryError('');

        if (!title || title.trim() === '') {
            setTitleError("Das Feld Titel soll nicht leer sein");
            error = true;
        }
        // const firstChar = title.charAt(0);
        if (title.charAt(0) !== title.charAt(0).toUpperCase()) {
            setTitleError("Das Feld Titel soll mit dem Großbuchstabe anfangen");
            error = true;
        }

        if (!description || description.trim() === '') {
            setDescriptionError("Das Feld Beschreibung soll nicht leer sein");
            error = true;
        }

        if (country.charAt(0) !== country.charAt(0).toUpperCase()) {
            setCountryError("Das Feld Land soll mit dem Großbuchstabe anfangen");
            error = true;
        }

        if (error){
            return;
        }


        console.log('submit');
        console.log('title', title);
        console.log('description', description);
        console.log('category', category);
        const output = {
            "blockTitle": title.trim(),
            "blockLand": country.trim(),
            "blockReiseTyp": category.join(','),
            "blockBild": picURL,
            "blockDatum": new Date().toLocaleString('de-DE'),
            "blockText": description,
            "blockId": uuidv4(),
            "blockKommentare": [],
        }
        console.log('output', output);
        // db.push(output);
        // console.log(db);
        setTitle('');
        setDescription('');
        setCountry('');
        setPicURL('');
        setCategory([]);
    }

    function handleChange(evt) {
        const {name, value} = evt.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'country':
                setCountry(value);
                break;
            case 'picURL':
                setPicURL(value);
                break;
            default:
                break;
        }

    }


    function handleChangeCategory(value) {
        setCategory(value.map(item=>item.value));
    }



    //Quill-Style
    const toolbarOptions  = [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']                                         // remove formatting button
    ];
    const module = {
            toolbar: toolbarOptions,
    };

    function getValueCategory() {
        return options.filter(option => category.indexOf(option.value) !== -1);
    }


    return (
        <div className="container my-5 bg-color" >
            <form onSubmit={handleOnSubmit} >
                <div className="mb-4">
                    <label htmlFor="title" className="form-label text-style">Titel</label>
                    <input type="text" name="title" value={title} onChange={handleChange} className={titleError ? "form-control is-invalid" : "form-control"}
                           id="title" placeholder="Bitte hier den Titel eingeben..."/>
                    <div className="invalid-feedback">
                        {titleError}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="form-label text-style">Land</label>
                    <input type="text" name="country" value={country} onChange={handleChange}
                           className={countryError ? "form-control is-invalid" : "form-control"} id="country" placeholder="Bitte hier das Land eingeben..."/>
                    <div className="invalid-feedback">
                        {countryError}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="form-label text-style">Kategorie</label>
                    <Select
                        isMulti
                        id="category"
                        name="category"
                        onChange={handleChangeCategory}
                        value={getValueCategory()}
                        options={options}
                        placeholder={'Bitte wählen Sie Kategorien aus....'}
                        classNamePrefix='custom-select'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="picURL" className="form-label text-style">Bild-URL</label>
                    <input type="text" name="picURL" value={picURL} onChange={handleChange}
                           className="form-control" id="picURL" placeholder="Bitte hier die Bild-URL eingeben..."/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-style">Beschreibung</label>
                    <div className={descriptionError ? "invalid-feedback-display" : "invalid-feedback"}>
                        {descriptionError}
                    </div>
                    <ReactQuill modules={module} theme="snow" value={description} onChange={setDescription}
                                id="description"/>
                </div>
                <button type="submit" className="btn-form-submit">Submit</button>
            </form>
            <button onClick={handleApi}  className="btn-form-submit">API</button>
        </div>
    );
};

export default AdminPage;