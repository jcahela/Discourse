import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SettingsOverlay from '../SettingsOverlay';

import './ChannelButton.css'

function ChannelButton({ channel }) {
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);
    const [showChannelSettingsIcon, setShowChannelSettingsIcon] = useState(false);
    const [showChannelSettingsModal, setShowChannelSettingsModal] = useState(false);

    const openChannelSettingsOverlay = () => {
        setShowChannelSettingsIcon(false);
        setShowChannelSettingsModal(true);
    }

    const channelOwnerId = servers[channel.serverId]["ownerId"]
    const currentUserIsOwner = sessionUser.id === channelOwnerId;
    return ( 
        <div 
            className="channel-name-container"
            onMouseEnter={() => setShowChannelSettingsIcon(true)}
            onMouseLeave={() => setShowChannelSettingsIcon(false)}
        >
            <span className="channel-name-hashtag">#</span>
            <p className="channel-name">{channel.name}</p>
            <div className="channel-settings-container">
                { currentUserIsOwner && showChannelSettingsIcon && 
                    <span 
                        className="material-icons channel-settings-icon"
                        onClick={openChannelSettingsOverlay}
                    >settings</span> }
            </div>
            { showChannelSettingsModal && 
                <Modal onClose={() => setShowChannelSettingsModal(false)}>
                    <SettingsOverlay channel={channel} onClose={() => setShowChannelSettingsModal(false)}/>
                </Modal>
            }
        </div>
    );
}

export default ChannelButton;
