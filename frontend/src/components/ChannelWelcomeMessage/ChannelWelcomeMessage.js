import { Modal } from '../../context/Modal';
import { useState } from 'react';
import SettingsOverlay from '../SettingsOverlay';
import './ChannelWelcomeMessage.css'

function ChannelWelcomeMessage({ channel, setChannelSelected }) {
    const [showChannelSettingsModal, setShowChannelSettingsModal] = useState(false);

    return ( 
        <div className="channel-welcome-message-container">
            <div className="channel-welcome-hashtag">#</div>
            <h1 className="channel-welcome-header">Welcome to <span className="channel-welcome-name">#{channel?.name}</span>!</h1>
            <p className="channel-welcome-subheader">This is the start of the #{channel?.name} channel. {channel?.topic}</p>
            <div onClick={() => setShowChannelSettingsModal(true)} className="channel-welcome-edit-channel-container">
                <span className="material-icons channel-welcome-edit-channel-icon">edit</span>
                <p className="channel-welcome-edit-channel">Edit Channel</p>
            </div>
            { showChannelSettingsModal && 
                <Modal onClose={() => setShowChannelSettingsModal(false)}>
                    <SettingsOverlay channel={channel} onClose={() => setShowChannelSettingsModal(false)} setChannelSelected={setChannelSelected}/>
                </Modal>
            }
        </div>
     );
}

export default ChannelWelcomeMessage;
