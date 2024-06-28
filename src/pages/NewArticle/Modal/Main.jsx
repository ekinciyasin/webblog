import React, {useState} from 'react';
import Modal from "./Modal";

const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <p>Main main</p>
            <button onClick={()=>setIsModalOpen(true)} className="btn-form-submit">Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
                <p>
                    Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
                    LoremLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
                    Lorem Lorem Lorem LoremLorem Lorem LoremLorem Lorem Lorem
                    Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem LoremLorem
                    Lorem Lorem Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem
                    LoremLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem LoremLorem
                    Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem LoremLorem
                    Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem LoremLorem
                    Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem LoremLorem
                    Lorem LoremLorem Lorem Lorem
                    Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem
                </p>
            </Modal>

        </div>
);
};

export default Main;