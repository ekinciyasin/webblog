import React, {useContext, useState} from 'react';
import './AccountPage.css';
import Modal from "../NewArticle/Modal/Modal";
import {AuthContext} from "../../state/AuthenticationContext";
import axios from "axios";

const ModalType = {
    EMAIL: 'emailModal',
    PASSWORD: 'passwordModal',
    DELETE: 'deleteModal',
    ADMIN: 'deleteAdmin'
}

const AccountPage = () => {
    const authState = useContext(AuthContext);

    const {id, username, email, role, password} = authState;

    // console.log(id, username, email, role, password)


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [emailContent, setEmailContent] = useState(email);
    const [passwordContent, setPasswordContent] = useState(password);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleDeleteAccount = async () => {
        //if admin
        if(role==='ADMIN'){
            setIsModalOpen(false);
            handleOpenModal(ModalType.ADMIN);
            return;
        }

        try {
            await axios.delete(`http://localhost:3005/users/${id}`);
            console.log("Account gelöscht");
            setIsModalOpen(false);
            authState.onLogoutSuccess();
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };



    async function handleChangeEmail() {

        if (!emailContent || emailContent.trim() === '') {
            setEmailError("Das Feld soll nicht leer sein");
            return;
        }
        if (!emailContent.includes('@')) {
            setEmailError("E-Mail-Adresse muss ein '@' Zeichen enthalten.");
            return;
        }

        try {
            const updatedEmail = {"email": emailContent}
            const response= await axios.patch(`http://localhost:3005/users/${id}`, updatedEmail);
            console.log("Email geändert");
            setIsModalOpen(false);
            authState.onLoginSuccess( response.data);
        } catch (error) {
            console.error("There was an error updating the user email!", error);
        }

    }

    async function handleChangePassword() {

        if (passwordContent.length < 4 || passwordContent.length > 20) {
            setPasswordError("Passwort muss zwischen 4 und 20 Zeichen sein.");
            return;
        }

        try {
            const updatedPassword = {"password": passwordContent}

            const response = await axios.patch(`http://localhost:3005/users/${id}`, updatedPassword);

            console.log("Password geändert");
            setIsModalOpen(false);
            authState.onLoginSuccess( response.data);
        } catch (error) {
            console.error("There was an error updating the user password!", error);
        }
    }


    function handleChange(evt) {
        const {name, value} = evt.target;
        console.log(value);
        switch (name) {
            case 'email':
                setEmailContent(value);
                break;
            case 'password':
                setPasswordContent(value);
                break;
            default:
                break;
        }

    }

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };


    return (
        <>
            <div className="container container-account">
                <h1>Profil</h1>
                {authState && <div className="account-card">
                    <div>
                        <div className="account-items">
                            <p className="accout-items-label">Name:</p>
                            <p>{username}</p>
                            <div className="btn-column"></div>
                        </div>
                        <div className="account-items">
                            <p className="accout-items-label">Email:</p>
                            <p>{email}</p>


                            {/*    <div className="btn-column">
                                <button className="btn btn-danger"
                                        onClick={() => handleOpenModal(ModalType.EMAIL)}>Email ändern
                                </button>
                            </div>*/}

                            <div className="edit-btn-div" onClick={() => handleOpenModal(ModalType.EMAIL)}>
                                Email ändern
                            </div>

                        </div>
                        <div className="account-items">
                            <p className="accout-items-label">Passwort:</p>
                            <p className="text-password">{'•'.repeat(password.length)}</p>
                            <div className="btn-column">
                                {/*<button className="btn btn-danger"
                                        onClick={() => handleOpenModal(ModalType.PASSWORD)}>Passwort ändern
                                </button>*/}
                                <div className="edit-btn-div" onClick={() => handleOpenModal(ModalType.PASSWORD)}>
                                    Passwort ändern
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*<div className="account-delete-btn">
                        <button className="btn btn-danger" onClick={() => handleOpenModal(ModalType.DELETE)}>Account
                            löschen
                        </button>
                    </div>*/}
                    <div className="delete-btn-div" onClick={() => handleOpenModal(ModalType.DELETE)}>
                        Account löschen
                    </div>

                </div>}

            </div>

            <Modal width={'20vw'} bgColor={'#0B1D26'} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.EMAIL && (
                    <>
                        <label htmlFor="email" className="form-label text-style">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={emailContent}
                            onChange={handleChange}
                            className={emailError ? "form-control is-invalid" : "form-control"}
                            id="email"
                            placeholder="Bitte hier den Email eingeben..."
                        />
                        <div className="invalid-feedback">
                            {emailError}
                        </div>
                        <div className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary" onClick={handleChangeEmail}>Ja</button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}>Nein
                            </button>
                        </div>
                    </>
                )}
                {modalType === ModalType.PASSWORD && (
                    <>
                        <label htmlFor="password" className="form-label text-style">Neues Passwort</label>
                        <input
                            type="password"
                            name="password"
                            value={passwordContent}
                            onChange={handleChange}
                            className={passwordError ? "form-control is-invalid" : "form-control"}
                            id="password"
                            placeholder="Bitte hier den Passwort eingeben..."
                        />
                        <div className="invalid-feedback">
                            {passwordError}
                        </div>
                        <div className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Ja</button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}>Nein
                            </button>
                        </div>
                    </>
                )}
                {modalType === ModalType.DELETE && (
                    <>
                        <p style={{textAlign: 'center'}}>Bist du sicher, dass du deinen Account löschen möchtest? Diese
                            Aktion kann nicht rückgängig gemacht werden.</p>
                        <div className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary" onClick={handleDeleteAccount}>Ja</button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}>Nein
                            </button>
                        </div>
                    </>
                )}
                {modalType === ModalType.ADMIN && (
                    <>
                        <p style={{textAlign: 'center'}}> Das Administratorkonto kann nicht so einfach gelöscht werden. Bitte kontaktieren Sie den Blog-Eigentümer!</p>
                        <div className="mt-2 pt-2 d-grid gap-2 d-md-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}>Ok
                            </button>
                        </div>
                    </>
                )}
            </Modal>




        </>
    );
};

export default AccountPage;
