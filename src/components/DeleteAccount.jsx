import React from 'react';

const DeleteAccount = () => {
    const handleDeleteAccount = () => {
        //Logik zum löschen von der Datenbank, Yasin?
        console.log("Account gelöscht");
    };

    return (
        <div className="container mt-5">
            <h2>Account löschen</h2>
            <p>Bist du sicher, dass du deinen Account löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.</p>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Account löschen</button>
        </div>
    );
};

export default DeleteAccount;
