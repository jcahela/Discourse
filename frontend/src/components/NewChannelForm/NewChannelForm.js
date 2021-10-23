import { useState } from 'react';
import { addChannelThunk } from '../../store/channels';
import { useDispatch } from 'react-redux';

import './NewChannelForm.css'

function NewChannelForm({ server, onClose }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState('')
    const [newChannelErrors, setNewChannelErrors] = useState([])

    const submitAddChannel = async (e) => {
        e.preventDefault();
        
        const newChannel = {
            name: channelName,
            serverId: server.id
        }

        const data = await dispatch(addChannelThunk(newChannel));
        if (data) {
            setNewChannelErrors(data.errors);
            return;
        } 
        onClose();
    }

    const channelNameContainsOnlySpaces = channelName.replace(/\s/g, '').length === 0

    return ( 
        <form onSubmit={submitAddChannel} className="new-channel-form-container">
            <h1 className="new-channel-header">Create Channel</h1>
            <label className="new-channel-name-label">
                Channel Name
                <input 
                    type="text" 
                    className="new-channel-name-input" 
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
                {newChannelErrors.map((error, index) => (
                        <div key={index} className="channel-error-container">
                            <p className="channel-error">{error}</p>
                        </div>
                ))}
            </label>
            <div className="new-channel-cancel-submit-container">
                <span className="new-channel-cancel-button" onClick={onClose}>Cancel</span>
                <button 
                    className={`new-channel-submit-button new-channel-disabled-${channelNameContainsOnlySpaces}`}
                    disabled={channelNameContainsOnlySpaces}
                >Create Channel</button>
            </div>
        </form>
     );
}

export default NewChannelForm;
