import { useState, useRef } from 'react';
import './MessageDisplay.css'
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker  } from 'emoji-mart'

function MessageDisplay({ socket, setMessageBeingEdited, messageBeingEdited, message, setShowDeleteMessageModal }) {
    const editMessageRef = useRef();
    const [editedMessage, setEditedMessage] = useState(message.content);
    const [editMessageError, setEditMessageError] = useState('');
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(message.content.length);
    const [showEmojiPicker, setShowEmojiPicker] = useState('');
    const [emoji, setEmoji] = useState('😁');
    
    const handleChange = (e) => {
        setEditedMessage(e.target.value);
        setMessageCharacterCounter(e.target.value.length);
    }

    const handleEscEnter = (e) => {
        if (e.key === "Escape") {
            setMessageBeingEdited(false);
            setEditedMessage(message.content)
            return
        }

        if (messageCharacterCounter > 2000 && e.key === "Enter") {
            e.preventDefault();
            setEditMessageError('Message cannot exceed 2000 characters.');
            return;
        }

        if (e.key === "Enter" && messageCharacterCounter === 0) {
            setEditMessageError('');
            setMessageBeingEdited(false);
            setEditedMessage(message.content);
            setShowDeleteMessageModal(message.id);
            return
        }

        if (/^\s*$/.test(editedMessage)) {
            return;
        } 

        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    const handleCancel = () => {
        setShowEmojiPicker(false);
        setMessageBeingEdited(false);
        setEditMessageError('');
        setEditedMessage(message.content);
        setMessageCharacterCounter(message.content.length);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (messageCharacterCounter === 0) {
            setMessageBeingEdited(false);
            setEditedMessage(message.content);
            setShowDeleteMessageModal(message.id);
            return
        }

        if (messageCharacterCounter > 2000) {
            setEditMessageError('Message cannot exceed 2000 characters.');
            return;
        }

        if (/^\s*$/.test(editedMessage)) {
            setEditMessageError('Messages cannot contain only spaces.')
            return;
        } 

        setEditMessageError('');
        setShowEmojiPicker(false);

        const newMessage = {
            id: message.id,
            content: editedMessage
        }
        socket.emit('message-edit', newMessage)
        setMessageBeingEdited(false);
    }

    const handleEmoji = (emoji) => {
        setEditedMessage(editedMessage + emoji.native);
        editMessageRef.current.focus();
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
        messageBeingEdited === message.id ? (
            <form className="message-edit-form" onSubmit={handleSubmit}>
                    { showEmojiPicker && 
                        <NimblePicker 
                            set='google'
                            data={data}
                            theme={"dark"} 
                            style={{position: 'absolute', zIndex: 3, right: "60px", bottom: "100px"}} 
                            onSelect={(emoji) => handleEmoji(emoji)}
                        />
                    }

                    <p onMouseOver={shuffleEmoji} onClick={handleEmojiPicker} className="emoji-selector-edit">{emoji}</p>
                    
                    <textarea 
                        ref={editMessageRef}
                        className="message-edit-input" 
                        value={editedMessage} 
                        onChange={handleChange}
                        onKeyDown={handleEscEnter}
                    ></textarea>
                    <div className="message-edit-options-container">
                        <p className="message-edit-cancel">escape to <span onClick={handleCancel} className="message-edit-cancel-button">cancel</span></p>
                        <span className="message-edit-dot">•</span>
                        <span className="message-edit-save">enter to <button className="message-edit-save-button">save</button></span>
                        { editMessageError && 
                            <p className="message-edit-error">{editMessageError}</p>
                        }
                    </div>
                    <p className={`message-edit-character-counter message-edit-counter-negative-${messageCharacterCounter > 2000}`}>{messageCharacterCounter}/2000</p>
            </form>
        ):(
            <div className="channel-content-message">{message.content}{message.updatedAt !== message.createdAt && <span className="message-edited-true">(edited)</span>}</div>
        )
    );
}

export default MessageDisplay;
