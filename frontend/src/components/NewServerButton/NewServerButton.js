import './NewServerButton.css'
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import ServerPopupMessage from '../ServerPopupMessage';

function NewServerButton() {
    const [showServerModal, setShowServerModal] = useState(false)
    const [showAddServerPopup, setShowAddServerPopup] = useState(false)
    
    const showPopupMessage = () => {
        setShowAddServerPopup(true)
    }
    const hidePopupMessage = () => {
        setShowAddServerPopup(false)
    }
    
    return ( 
        <div className="new-server-button-holder">
            <div onMouseOver={showPopupMessage} onMouseLeave={hidePopupMessage} onClick={() => setShowServerModal(true)} className="new-server-button-container">
                <span className="new-server-button-plus-icon">+</span>
            </div>
            { showAddServerPopup && (
                <ServerPopupMessage content={"Add A Server"} />
            )}
            { showServerModal && (
                <Modal onClose={() => setShowServerModal(false)}>
                    <h1>New Server Modal</h1>
                </Modal>
            )}
        </div>
     );
}

export default NewServerButton;
