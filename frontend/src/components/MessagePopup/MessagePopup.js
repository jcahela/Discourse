
import './MessagePopup.css'

function MessagePopup({ message, setMessageBeingEdited, setShowMessagePopup, setShowDeleteMessageModal }) {

    const handleDelete = () => {
        setMessageBeingEdited(false);
        setShowDeleteMessageModal(message.id);
        setShowMessagePopup(false);
    }

    return ( 
        <>
            <div className="track-to-prevent-hover-above">
                <div className="message-popup-container">
                    <span className="material-icons message-edit-icon" onClick={() => setMessageBeingEdited(message.id)}>edit</span>
                    <span className="material-icons message-delete-icon" onClick={handleDelete}>delete_outline</span>
                </div>
            </div>
        </>
     );
}

export default MessagePopup;
