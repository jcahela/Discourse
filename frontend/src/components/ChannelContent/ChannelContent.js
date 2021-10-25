import ChannelWelcomeMessage from '../ChannelWelcomeMessage';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages';

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected, socket }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const messages = useSelector(state => Object.values(state.messages).filter(message => message.channelId === channel?.id))

    const orderedMessages = messages.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)

    useEffect(() => {
        socket.on('receive-message', message => {
            dispatch(addMessage(message));
        })
    }, [dispatch, socket])

    const submitMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            userId: sessionUser.id,
            channelId: channel.id,
            content: message
        }
        socket.emit('message', newMessage);
        setMessage('');
    }

    return ( 
        <div className="channel-content-container">

            <div className="channel-content-header-container">
                <span className="channel-content-header-hashtag">#</span>
                <h1 className="channel-content-header">{channel?.name}</h1>
            </div>

            <div className="channel-content-messages-container">
                {orderedMessages.map(message => (
                    <div className="channel-content-message">{message.content}</div>
                ))}
                <ChannelWelcomeMessage channel={channel} setChannelSelected={setChannelSelected}/>
            </div>

            <div onSubmit={submitMessage} className="channel-content-chat-input-container">
                <form className="new-message-form">
                    <label className="new-message-label">
                        <input 
                            type="text" 
                            className="new-message-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>
                    <button className="new-message-submit"></button>
                </form>
            </div>
        </div>
     );
}

export default ChannelContent;
