import { Modal } from '../../context/Modal'
import { useState } from 'react';
import ServerSettingsInfo from '../ServerSettingsInfo';
import './SettingsOverlay.css'

function SettingsOverlay({ server, onClose, channel, setServerSelected }) {
    const [showModal, setShowModal] = useState();

    return ( 
        <div className="overlay-container">
            <div className="overlay-options">
                <div className="overlay-options-list">
                    <h1 className="overlay-name">{server ? server.name: channel.name}</h1>
                    <div className="overlay-overview-selector">Overview</div>
                    <div onClick={() => setShowModal(true)} className="overlay-delete-button">Delete {server ? 'Server':'Channel'}</div>
                </div>
            </div>
            <div className="overlay-info">
                {server ? (
                    <ServerSettingsInfo server={server} onClose={onClose} setServerSelected={setServerSelected}/>
                ):(
                    <h1>Add ChannelSettingsInfo Component and pass in channel as prop</h1>
                )}
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
