// EditUserModal.js
import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ show, user, newRole, setNewRole, handleClose, handleSave }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };

    useEffect(() => {
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal fade show" id="yasin-modal" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Benutzer Bearbeiten</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Name:</strong> {user?.username}</p>
                        <p><strong>E-Mail:</strong> {user?.email}</p>
                        <div className="mb-3">
                            <label className="form-label">Neue Rolle:</label>
                            <select className="form-select" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                <option value="">Auswählen</option>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">Benutzer</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Abbrechen</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Speichern</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
