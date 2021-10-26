import ChannelWelcomeMessage from '../ChannelWelcomeMessage';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages';

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected, socket }) {
    const dispatch = useDispatch();
    const messageRef = useRef();
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

    const handleEnter = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
        
        const currentMessage = messageRef.current.value;

        if (/^\s*$/.test(currentMessage)) {
            return;
        } else if (/\n$/.test(currentMessage)) submitMessage(e);
    }

    return ( 
        <div className="channel-content-container">

            <div className="channel-content-header-container">
                <span className="channel-content-header-hashtag">#</span>
                <h1 className="channel-content-header">{channel?.name}</h1>
            </div>

            <div className="channel-content-messages-container">
                {orderedMessages.map((message, index) => {
                    const nextMessage = orderedMessages[index+1]
                    const nextMessageSameOwnerAsCurrentMessage = nextMessage?.User?.id === message?.User?.id
                    const messageDate = new Date(message.createdAt)
                    const formattedDate = messageDate.toLocaleString();
                    return (
                        nextMessageSameOwnerAsCurrentMessage ? (
                            <div className="message-without-profile-pic-container">
                                <div className="message-profile-standin"></div>
                                <div className="username-message-container">
                                    <div className="channel-content-message">{message.content}</div>
                                </div>
                            </div>
                        ):(
                            <div className="message-with-profile-pic-container">
                                <div className="message-profile-pic-container">
                                    <img className="message-profile-pic" src={message.User.profilePicture} alt="" />
                                </div>
                                <div className="username-message-container">
                                    <div className="message-username">{message.User.username}<span className="message-date-time">{formattedDate}</span></div>
                                    
                                    <div className="channel-content-message">{message.content}</div>
                                </div>
                            </div>
                        )
                    
                    )

                })}
                <ChannelWelcomeMessage channel={channel} setChannelSelected={setChannelSelected}/>
            </div>

            <div onSubmit={submitMessage} className="channel-content-chat-input-container">
                <form className="new-message-form">
                    <label className="new-message-label">
                        <textarea 
                            type="text" 
                            className="new-message-input"
                            value={message}
                            onChange={handleEnter}
                            ref={messageRef}
                        ></textarea>
                    </label>
                    <button className="new-message-submit"></button>
                </form>
            </div>
        </div>
     );
}

export default ChannelContent;
