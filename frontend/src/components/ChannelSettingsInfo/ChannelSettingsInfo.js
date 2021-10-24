import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { editChannelThunk } from '../../store/channels';
import './ChannelSettingsInfo.css'

function ChannelSettingsInfo({ channel, onClose }) {
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState(channel?.name);
    const [initialTopicValue] = useState(channel?.topic || '')
    const [channelTopic, setChannelTopic] = useState(channel?.topic || '');
    const [channelNameError, setChannelNameError] = useState('');
    const [channelTopicError, setChannelTopicError] = useState('')
    const [nameCharacterCounter, setNameCharacterCounter] = useState(25 - channelName.length)
    const [topicCharacterCounter, setTopicCharacterCounter] = useState(255 - channelTopic.length)

    const nameChanged = channelName !== channel?.name;
    const topicChanged = channelTopic !== initialTopicValue;
    const channelNameContainsOnlySpaces = channelName.replace(/\s/g, '').length === 0
    const topicNameContainsOnlySpaces = channelTopic.replace(/\s/g, '').length === 0

    const submitEditChannel = async (e) => {
        e.preventDefault();
        setChannelNameError('');
        setChannelTopicError('');
        if (channelNameContainsOnlySpaces && channelName.length > 0) {
            setChannelNameError('Channel name cannot contain only spaces.');
            return;
        }
        if (topicNameContainsOnlySpaces && channelTopic.length > 0) {
            setChannelTopicError('Topic cannot contain only spaces.');
            return;
        }
        const editedChannel = {
            id: channel.id,
            name: channelName,
            topic: channelTopic
        }
        const data = await dispatch(editChannelThunk(editedChannel));
        if (data) {
            data.errors.forEach(error => {
                if (error.toLowerCase().includes('channel')) {
                    setChannelNameError(error)
                } else {
                    setChannelTopicError(error)
                }
            });
            return
        } 
        onClose();
    }

    const updateName = (e) => {
        setChannelName(e.target.value);
        setNameCharacterCounter(25 - e.target.value.length);
    }

    const updateTopic = (e) => {
        setChannelTopic(e.target.value);
        setTopicCharacterCounter(255 - e.target.value.length);
    }
    
    return ( 
        <form onSubmit={submitEditChannel} className="channel-settings-form">
            <label className="channel-settings-name-label">
                Channel Name
                <input 
                    type="text" 
                    className="channel-settings-name-input"
                    value={channelName}
                    onChange={updateName}
                />
                <p className={`channel-name-character-counter character-length-exceeded-${nameCharacterCounter < 0}`}>{nameCharacterCounter}</p>
            </label>
                <div className="channel-edit-errors">
                    {channelNameError}
                </div>
            <label className="channel-settings-topic-label">
                Channel Topic (Optional)
                <textarea 
                    cols="30" 
                    rows="10" 
                    className="channel-settings-topic-textarea"
                    placeholder="Let everyone know how to use this channel"
                    value={channelTopic}
                    onChange={updateTopic}
                ></textarea>
                <p className={`topic-character-counter character-length-exceeded-${topicCharacterCounter < 0}`}>{topicCharacterCounter}</p>
            </label>
                <div className="channel-edit-errors">
                    {channelTopicError}
                </div>
            <button className={`channel-settings-save-button channel-settings-disabled-${(!nameChanged && !topicChanged)}`} disabled={(!nameChanged && !topicChanged)}>Save Changes</button>
        </form>
    );
}

export default ChannelSettingsInfo;
