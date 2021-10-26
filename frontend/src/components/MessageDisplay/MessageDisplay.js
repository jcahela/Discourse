import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MessageDisplay.css'

function MessageDisplay({ socket, setMessageBeingEdited, messageBeingEdited, message }) {
    const dispatch = useDispatch();
    const [editedMessage, setEditedMessage] = useState(message.content)

    useEffect(() => {
        socket.on('receive-edit', message => {
            console.log(message)
        })
    }, [dispatch, socket])

    const handleEscEnter = (e) => {
        if (e.key === "Escape") {
            setMessageBeingEdited(false);
            setEditedMessage(message.content)
        }

        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    const handleCancel = () => {
        setMessageBeingEdited(false);
        setEditedMessage(message.content)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            id: message.id,
            content: editedMessage
        }
        socket.emit('message-edit', newMessage)
        setMessageBeingEdited(false);
        setEditedMessage(message.content)
    }

    return ( 
        messageBeingEdited === message.id ? (
            <form className="message-edit-form" onSubmit={handleSubmit}>
                    <textarea 
                        className="message-edit-input" 
                        value={editedMessage} 
                        onChange={(e) => setEditedMessage(e.target.value)}
                        onKeyDown={handleEscEnter}
                    ></textarea>
                    <div className="message-edit-options-container">
                        <p className="message-edit-cancel">escape to <span onClick={handleCancel} className="message-edit-cancel-button">cancel</span></p>
                        <span className="message-edit-dot">•</span>
                        <span className="message-edit-save">enter to <button className="message-edit-save-button">save</button></span>
                    </div>
            </form>
        ):(
            <div className="channel-content-message">{message.content}</div>
        )
    );
}

export default MessageDisplay;
