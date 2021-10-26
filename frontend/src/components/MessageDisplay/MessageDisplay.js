import { useState } from 'react';
import './MessageDisplay.css'

function MessageDisplay({ messageBeingEdited, message }) {
    const [editedMessage, setEditedMessage] = useState(message.content)

    const submitMessageEdit = (e) => {
        e.preventDefault();
    }

    return ( 
        messageBeingEdited === message.id ? (
            <form className="message-edit-form" onSubmit={submitMessageEdit}>
                    <input 
                        className="message-edit-input" 
                        value={editedMessage} 
                        onChange={(e) => setEditedMessage(e.target.value)}
                    />
                    <div className="message-edit-options-container">
                        <p className="message-edit-cancel">cancel</p>
                        <button className="message-edit-save">save</button>
                    </div>
            </form>
        ):(
            <div className="channel-content-message">{message.content}</div>
        )
    );
}

export default MessageDisplay;
