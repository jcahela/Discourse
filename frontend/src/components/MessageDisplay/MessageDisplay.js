import { useState } from 'react';
import './MessageDisplay.css'

function MessageDisplay({ socket, setMessageBeingEdited, messageBeingEdited, message, setShowDeleteMessageModal }) {
    const [editedMessage, setEditedMessage] = useState(message.content);
    const [editMessageError, setEditMessageError] = useState('');
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(message.content.length);

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
        setMessageBeingEdited(false);
        setEditMessageError('');
        setEditedMessage(message.content);
        setMessageCharacterCounter(message.content.length)
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

        const newMessage = {
            id: message.id,
            content: editedMessage
        }
        socket.emit('message-edit', newMessage)
        setMessageBeingEdited(false);
    }

    return ( 
        messageBeingEdited === message.id ? (
            <form className="message-edit-form" onSubmit={handleSubmit}>
                    <textarea 
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
