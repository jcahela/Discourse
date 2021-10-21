import './NewServerButton.css'
import { Modal } from '../../context/Modal';
import { useState } from 'react';

function NewServerButton() {
    const [showServerModal, setShowServerModal] = useState(false)
    
    return ( 
        <>
            <div onClick={() => setShowServerModal(true)} className="new-server-button-container">
                <span className="new-server-button-plus-icon">+</span>
            </div>
            { showServerModal && (
                <Modal onClose={() => setShowServerModal(false)}>
                    <h1>New Server Modal</h1>
                </Modal>
            )}
        </>
     );
}

export default NewServerButton;
