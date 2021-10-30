import ChannelWelcomeMessage from '../ChannelWelcomeMessage';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, editMessage, deleteMessage } from '../../store/messages';
import MessagePopup from '../MessagePopup';
import MessageDisplay from '../MessageDisplay';
import DeleteMessageForm from '../DeleteMessageForm';
import { Modal } from '../../context/Modal';
import OnlineUserCard from '../OnlineUserCard';
import OfflineUserCard from '../OfflineUserCard';

import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker  } from 'emoji-mart'

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected, socket }) {
    const dispatch = useDispatch();
    const messageRef = useRef();
    const [message, setMessage] = useState('');
    const offlineUsers = useSelector(state => Object.values(state.users).filter(user => user.onlineStatus === false));
    const onlineUsers = useSelector(state => Object.values(state.users).filter(user => user.onlineStatus === true));
    const sessionUser = useSelector(state => state.session.user);
    const messages = useSelector(state => Object.values(state.messages).filter(message => message.channelId === channel?.id));
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(0);
    const [messageError, setMessageError] = useState('');
    const [showHoverTime, setShowHoverTime] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [messageBeingEdited, setMessageBeingEdited] = useState(false);
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState('');
    const [emoji, setEmoji] = useState('😁');

    const orderedMessages = messages.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)

    useEffect(() => {
        socket.on('receive-message', message => {
            dispatch(addMessage(message));
        });

        socket.on('receive-message-edit', message => {
            dispatch(editMessage(message));
        });

        socket.on('receive-message-delete', deletedMessageId => {
            dispatch(deleteMessage(deletedMessageId));
        })
    }, [dispatch, socket])

    useEffect(() => {
        if (!showEmojiPicker) return;

        const closeMenu = () => {
            setShowEmojiPicker(false);
        };

        document.querySelector('.new-message-input').addEventListener('click', closeMenu);
        
        return () => document.removeEventListener("click", closeMenu);
    }, [showEmojiPicker]);

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

    const handleEmoji = (emoji) => {
        setMessage(message + emoji.native);
        messageRef.current.focus();
        setShowEmojiPicker(false);
    }

    const handleEmojiPicker = () => {
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setShowEmojiPicker(true);
        }
    }

    const shuffleEmoji = () => {
        const emojiArr = ['😆','😍','😁','😃','🤣','😅','🥰','😊','😗','😛', '🙄','🤩','☹️','🤗','😷','🤑','😴','🤤','😎','🤓']
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        const randomIndex = getRandomInt(0, 20);
        setEmoji(emojiArr[randomIndex]);
    }

    return ( 
        <div className="channel-content-outer-container">
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
                            <div key={message.id}>
                            { showDeleteMessageModal === message.id &&
                                <Modal onClose={() => setShowDeleteMessageModal(false)} message={message}>
                                    <DeleteMessageForm onClose={() => setShowDeleteMessageModal(false)} message={message} socket={socket}/>
                                </Modal>
                            }
                            {nextMessageSameOwnerAsCurrentMessage ? (
                                <div 
                                    className="message-without-profile-pic-container"
                                    onMouseOver={() => handleHoverOn(message.id)}
                                    onMouseLeave={handleHoverOff}
                                >
                                    <div className="message-profile-standin">
                                        { showHoverTime === message.id && <p className="message-hover-time">{formattedTime}</p>}
                                    </div>
                                    <div className="username-message-container">
                                        <MessageDisplay 
                                            socket={socket} 
                                            setMessageBeingEdited={setMessageBeingEdited} 
                                            message={message} 
                                            messageBeingEdited={messageBeingEdited} 
                                            setShowDeleteMessageModal={setShowDeleteMessageModal}
                                        />
                                    </div>
                                    { showMessagePopup === message.id && sessionUser.id === message.userId && <MessagePopup message={message} setMessageBeingEdited={setMessageBeingEdited} setShowMessagePopup={setShowMessagePopup} setShowDeleteMessageModal={setShowDeleteMessageModal}/>}
                                </div>
                            ):(
                                <div 
                                    className="message-with-profile-pic-container"
                                    onMouseOver={() => handleHoverOn(message.id)}
                                    onMouseLeave={handleHoverOff}
                                >
                                    <div className="message-profile-pic-container">
                                        <img className="message-profile-pic" src={message.User.profilePicture} alt="" />
                                    </div>
                                    <div className="username-message-container">
                                        <div className="message-username">{message.User.username}<span className="message-date-time">{formattedDate}</span></div>
                                        
                                        <MessageDisplay 
                                            socket={socket} 
                                            setMessageBeingEdited={setMessageBeingEdited} 
                                            message={message} 
                                            messageBeingEdited={messageBeingEdited}
                                            setShowDeleteMessageModal={setShowDeleteMessageModal}
                                        />
                                    </div>
                                    { showMessagePopup === message.id && sessionUser.id === message.userId && <MessagePopup message={message} setMessageBeingEdited={setMessageBeingEdited} setShowMessagePopup={setShowMessagePopup} setShowDeleteMessageModal={setShowDeleteMessageModal}/>}
                                </div>
                            )}
                            </div>
                        
                        )

                    })}
                    <ChannelWelcomeMessage channel={channel} setChannelSelected={setChannelSelected}/>
                    
                </div>

                <div onSubmit={submitMessage} className="channel-content-chat-input-container">
                    <form className="new-message-form">
                        { showEmojiPicker && 
                            <NimblePicker 
                                set='google'
                                data={data}
                                theme={"dark"} 
                                style={{position: 'absolute', zIndex: 3, left: "10px", bottom: "100px"}} 
                                onSelect={(emoji) => handleEmoji(emoji)}
                            />
                        }

                        <p onMouseOver={shuffleEmoji} onClick={handleEmojiPicker} className="emoji-selector">{emoji}</p>
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
            <div className="users-list-container">
                <div className="channel-content-header-container"></div>
                <div className="users-list">
                    <div className="online-users-container">
                        <h1 className="online-users-header">ONLINE -- {onlineUsers.length}</h1>
                        { onlineUsers.map(onlineUser => (
                            <OnlineUserCard key={onlineUser.id} user={onlineUser}/>
                        ))}
                    </div>
                    <div className="offline-users-container">
                        <h1 className="offline-users-header">OFFLINE -- {offlineUsers.length}</h1>
                        { offlineUsers.map(offlineUser => (
                            <OfflineUserCard key={offlineUser.id} user={offlineUser}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ChannelContent;
