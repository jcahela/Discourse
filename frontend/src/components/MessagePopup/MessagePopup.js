import './MessagePopup.css'

function MessagePopup({ message, setMessageBeingEdited, setMessagePopupBeingHovered }) {

    const removeHoverEffectOnContainer = () => {
        setMessagePopupBeingHovered(true);
    }

    const restoreHoverEffect = () => {
        setMessagePopupBeingHovered(false)
    }

    return ( 
        <>
            <div 
                className="track-to-prevent-hover-above" 
                onMouseOver={removeHoverEffectOnContainer}
                onMouseLeave={restoreHoverEffect}
            >

                <div className="message-popup-container">
                    <span className="material-icons message-edit-icon" onClick={() => setMessageBeingEdited(message.id)}>edit</span>
                    <span className="material-icons message-delete-icon">delete_outline</span>
                </div>
            </div>
        </>
     );
}

export default MessagePopup;
