import { Modal } from '../../context/Modal'
import { useState } from 'react';

import './SettingsOverlay.css'

function SettingsOverlay({ server, onClose }) {
    const [showModal, setShowModal] = useState();

    return ( 
        <div className="overlay-container">
            <div className="overlay-options">
                <div className="overlay-options-list">
                    <h1 className="overlay-name">{server.name}</h1>
                    <div className="overlay-overview-selector">Overview</div>
                    <div onClick={() => setShowModal(true)} className="overlay-delete-button">Delete Server</div>
                </div>
            </div>
            <div className="overlay-info">
                <div onClick={onClose} className="close-settings">x</div>
            </div>
            { showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h1>Test second modal for delete</h1>
                </Modal>
            ) }
        </div>
    );
}

export default SettingsOverlay;
