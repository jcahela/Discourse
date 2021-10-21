import './NewServerButton.css'
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import ServerPopupMessage from '../ServerPopupMessage';
import NewServerForm from '../NewServerForm';

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
                <ServerPopupMessage content={"Add a Server"} />
            )}
            { showServerModal && (
                <Modal onClose={() => setShowServerModal(false)}>
                    <NewServerForm onClose={() => setShowServerModal(false)}/>
                </Modal>
            )}
        </div>
     );
}

export default NewServerButton;
