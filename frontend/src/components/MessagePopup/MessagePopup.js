import './MessagePopup.css'

function MessagePopup({ message, setMessageBeingEdited }) {


    
    const handleDelete = () => {
        setMessageBeingEdited(false);
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
