import ChannelWelcomeMessage from '../ChannelWelcomeMessage';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../store/messages';
import MessagePopup from '../MessagePopup';
import MessageDisplay from '../MessageDisplay';

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected, socket }) {
    const dispatch = useDispatch();
    const messageRef = useRef();
    const [message, setMessage] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const messages = useSelector(state => Object.values(state.messages).filter(message => message.channelId === channel?.id));
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(0);
    const [messageError, setMessageError] = useState('');
    const [showHoverTime, setShowHoverTime] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [messagePopupBeingHovered, setMessagePopupBeingHovered] = useState(false);
    const [messageBeingEdited, setMessageBeingEdited] = useState(false);

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
        setMessageCharacterCounter(0)
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
        setMessageCharacterCounter(0+e.target.value.length)
    }

    const handleEnter = (e) => {
        if (messageCharacterCounter > 2000 && e.key === "Enter") {
            e.preventDefault();
            setMessageError('Message cannot exceed 2000 characters.');
            return;
        }
        
        if (/^\s*$/.test(message)) {
            return;
        } 
        
        if (e.key === "Enter") {
            submitMessage(e);
            setMessageError('')
        }
    }

    const handleHoverOn = (messageId) => {
        setShowHoverTime(messageId);
        setShowMessagePopup(messageId)
    }

    const handleHoverOff = () => {
        setShowHoverTime(false)
        setShowMessagePopup(false)
    }

    return ( 
        <div className="channel-content-container">

            <div className="channel-content-header-container">
                <span className="channel-content-header-hashtag">#</span>
                <h1 className="channel-content-header">{channel?.name}</h1>
                { channel?.topic && 
                    <>
                        <span className="channel-content-header-divider">|</span>
                        <p className="channel-content-topic">{channel.topic}</p>
                    </>
                }
            </div>

            <div className="channel-content-messages-container">
                {orderedMessages.map((message, index) => {
                    const nextMessage = orderedMessages[index+1]
                    const nextMessageSameOwnerAsCurrentMessage = nextMessage?.User?.id === message?.User?.id
                    const messageDate = new Date(message.createdAt)
                    const formattedDate = messageDate.toLocaleString();
                    const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                        nextMessageSameOwnerAsCurrentMessage ? (
                            <div 
                                key={message.id} 
                                className="message-without-profile-pic-container"
                                onMouseOver={() => handleHoverOn(message.id)}
                                onMouseLeave={handleHoverOff}
                            >
                                <div className="message-profile-standin">
                                    { showHoverTime === message.id && <p className="message-hover-time">{formattedTime}</p>}
                                </div>
                                <div className="username-message-container">
                                    <MessageDisplay socket={socket} setMessageBeingEdited={setMessageBeingEdited} message={message} messageBeingEdited={messageBeingEdited}/>
                                </div>
                                { showMessagePopup === message.id && sessionUser.id === message.userId && <MessagePopup message={message} setMessageBeingEdited={setMessageBeingEdited} setMessagePopupBeingHovered={setMessagePopupBeingHovered}/>}
                            </div>
                        ):(
                            <div 
                                key={message.id} 
                                className="message-with-profile-pic-container"
                                onMouseOver={() => handleHoverOn(message.id)}
                                onMouseLeave={handleHoverOff}
                            >
                                <div className="message-profile-pic-container">
                                    <img className="message-profile-pic" src={message.User.profilePicture} alt="" />
                                </div>
                                <div className="username-message-container">
                                    <div className="message-username">{message.User.username}<span className="message-date-time">{formattedDate}</span></div>
                                    
                                    <MessageDisplay socket={socket} setMessageBeingEdited={setMessageBeingEdited} message={message} messageBeingEdited={messageBeingEdited}/>
                                </div>
                                { showMessagePopup === message.id && sessionUser.id === message.userId && <MessagePopup message={message} setMessageBeingEdited={setMessageBeingEdited} setMessagePopupBeingHovered={setMessagePopupBeingHovered}/>}
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
                            onChange={handleChange}
                            onKeyDown={handleEnter}
                            ref={messageRef}
                            placeholder={`Message #${channel?.name}`}
                        ></textarea>
                        <p className={`message-character-counter message-counter-negative-${messageCharacterCounter > 2000}`}>{messageCharacterCounter}/2000</p>
                        { messageError && 
                            <p className="message-error">{messageError}</p>
                        }
                    </label>
                    <button className="new-message-submit"></button>
                </form>
            </div>
        </div>
     );
}

export default ChannelContent;
