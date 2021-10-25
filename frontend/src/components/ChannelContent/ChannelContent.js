import ChannelWelcomeMessage from '../ChannelWelcomeMessage';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages';

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected, socket }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);

  // socket.emit('fake-message', {
  //   userId: 1,
  //   channelId: 20,
  //   content: 'This is a message object that will represent a message',
  // })

    useEffect(() => {
        socket.on('receive-message', message => {
            dispatch(addMessage(message));
        })
    }, [socket])

    const submitMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            userId: sessionUser.id,
            channelId: channel.id,
            content: message
        }
        socket.emit('message', newMessage);
        
    }

    return ( 
        <div className="channel-content-container">

            <div className="channel-content-header-container">
                <span className="channel-content-header-hashtag">#</span>
                <h1 className="channel-content-header">{channel?.name}</h1>
            </div>

            <div className="channel-content-messages-container">
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
