import { useState } from 'react';
import './NewChannelForm.css'

function NewChannelForm({ onClose }) {
    const [channelName, setChannelName] = useState('')

    return ( 
        <form className="new-channel-form-container">
            <h1 className="new-channel-header">Create Channel</h1>
            <label className="new-channel-name-label">
                Channel Name
                <input 
                    type="text" 
                    className="new-channel-name-input" 
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
            </label>
            <div className="new-channel-cancel-submit-container">
                <span className="new-channel-cancel-button" onClick={onClose}>Cancel</span>
                <button className="new-channel-submit-button">Create Channel</button>
            </div>
        </form>
     );
}

export default NewChannelForm;
