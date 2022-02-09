import './NewServerButton.css'
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import NewServerForm from '../NewServerForm';

function NewServerButton() {
    const [showServerModal, setShowServerModal] = useState(false)
    
    return ( 
        <div className="new-server-button-holder">
            <div onClick={() => setShowServerModal(true)} className="new-server-button-container">
                <span className="new-server-button-plus-icon">+</span>
            </div>
            { showServerModal && (
                <Modal onClose={() => setShowServerModal(false)}>
                    <NewServerForm onClose={() => setShowServerModal(false)}/>
                </Modal>
            )}
        </div>
     );
}

export default NewServerButton;
