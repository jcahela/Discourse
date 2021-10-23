import { useSelector } from 'react-redux';

import './ChannelButton.css'

function ChannelButton({ channel }) {
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);

    const channelOwnerId = servers[channel.serverId]["ownerId"]
    const currentUserIsOwner = sessionUser.id === channelOwnerId;
    return ( 
        <div className="channel-name-container">
            <span className="channel-name-hashtag">#</span>
            <p className="channel-name">{channel.name}</p>
            { currentUserIsOwner && <span class="material-icons">settings</span> }
        </div>
    );
}

export default ChannelButton;
