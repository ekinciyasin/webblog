import React from 'react';

const Modal_1 = ({ isOpen, onClose }) => {
    return (
        <>
            <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} aria-hidden={!isOpen}>
                <div className="modal-dialog modal-dialog-centered" onClick={onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className="modal-backdrop fade show" onClick={onClose}></div>}
        </>
    );
};

export default Modal_1;