import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SettingsOverlay from '../SettingsOverlay';

import './ChannelButton.css'

function ChannelButton({ channel, setChannelSelected, channelSelected, setShowChannelSettingsIcon, showChannelSettingsIcon }) {
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);
    const [showChannelSettingsModal, setShowChannelSettingsModal] = useState(false);
    const [showChannelSettingsIconHover, setShowChannelSettingsIconHover] = useState(false);

    const openChannelSettingsOverlay = () => {
        setShowChannelSettingsIcon(false);
        setShowChannelSettingsModal(true);
    }

    const setChannel = () => {
        if (channelSelected.id === channel.id) {
            return;
        }
        setChannelSelected(channel);
        setShowChannelSettingsIconHover(false);
        console.log(channel);
    }

    const addHighlightEffect = () => {
        if (channelSelected?.id !== channel?.id) {
            setShowChannelSettingsIconHover(true)
        }
    }

    const removeHighlightEffect = () => {
        if (channelSelected?.id !== channel?.id) {
            setShowChannelSettingsIconHover(false)
        }
    }

    const channelOwnerId = servers[channel.serverId]["ownerId"]
    const currentUserIsOwner = sessionUser.id === channelOwnerId;
    return ( 
        <div 
            className={`channel-name-container channel-selected-${channelSelected?.id === channel?.id}`}
            onMouseEnter={addHighlightEffect}
            onMouseLeave={removeHighlightEffect}
            onClick={setChannel}
        >
            <span className="channel-name-hashtag">#</span>
            <p className="channel-name">{channel.name}</p>
            <div className="channel-settings-container">
                { currentUserIsOwner && channelSelected?.id === channel?.id && 
                    <span 
                        className="material-icons channel-settings-icon"
                        onClick={openChannelSettingsOverlay}
                    >
                        settings
                    </span> 
                }
                { currentUserIsOwner && channelSelected?.id !== channel?.id && showChannelSettingsIconHover &&
                    <span 
                    className="material-icons channel-settings-icon"
                    onClick={openChannelSettingsOverlay}
                    >
                        settings
                    </span> 
                }
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
