import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { editChannelThunk } from '../../store/channels';
import './ChannelSettingsInfo.css'

function ChannelSettingsInfo({ channel, onClose }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState(channel.name);
    const [initialTopicValue, setInitialTopicValue] = useState(channel.topic || '')
    const [channelTopic, setChannelTopic] = useState(channel.topic || '');
    const [channelEditErrors, setChannelEditErrors] = useState([]);

    const nameChanged = channelName !== channel.name;
    const topicChanged = channelTopic !== initialTopicValue;

    const submitEditChannel = async (e) => {
        e.preventDefault();
        const editedChannel = {
            id: channel.id,
            name: channelName,
            topic: channelTopic
        }
        const data = await dispatch(editChannelThunk(editedChannel));
        if (data) setChannelEditErrors(data.errors)
        onClose();
    }
    
    return ( 
        <form onSubmit={submitEditChannel} className="channel-settings-form">
            <label className="channel-settings-name-label">
                Channel Name
                <input 
                    type="text" 
                    className="channel-settings-name-input"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
            </label>
            <label className="channel-settings-topic-label">
                Channel Topic (Optional)
                <textarea 
                    cols="30" 
                    rows="10" 
                    className="channel-settings-topic-textarea"
                    placeholder="Let everyone know how to use this channel"
                    value={channelTopic}
                    onChange={(e) => setChannelTopic(e.target.value)}
                ></textarea>
            </label>
            <button className={`channel-settings-save-button channel-settings-disabled-${!nameChanged && !topicChanged}`}>Save Changes</button>
        </form>
    );
}

export default ChannelSettingsInfo;
