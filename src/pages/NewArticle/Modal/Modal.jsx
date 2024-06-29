import React, {useEffect} from 'react';
import './Modal.css'

const Modal = ({isOpen, onClose, children, ...otherProps}) => {
    const {width, bgColor} = otherProps;

    const onWrapperClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClose()
        }
    }

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    return (

        <div className={`modal ${isOpen ? 'modal-open' : 'modal-close'}`}>
            <div className="modal-wrapper" onClick={onWrapperClick}>
                <div style={{ width: width || '60vw', backgroundColor: bgColor|| 'rgb(27 37 41 / 83%)' }} className="modal-content-container">
                    <button className="modal-close-button" onClick={() => onClose()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>)
};

export default Modal;