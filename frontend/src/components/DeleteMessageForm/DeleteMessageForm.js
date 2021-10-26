import './DeleteMessageForm.css'

function DeleteMessageForm({ message, onClose, socket }) {

    const messageDate = new Date(message.createdAt)
    const formattedDate = messageDate.toLocaleString([], { month: '2-digit', day:'2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit' });

    const submitDelete = (e) => {
        e.preventDefault();
        const messageId = message.id;
        socket.emit('message-delete', messageId)
        onClose();
    }

    return ( 
        <form onSubmit={submitDelete} className="delete-message-form">
            <h1 className="delete-message-header">Delete Message</h1>
            <div className="delete-message-content">
                <p className="delete-message-subheader">Are you sure you want to delete this message?</p>
                <div className="delete-message-card">
                    <img className="delete-message-profile-picture" src={message.User.profilePicture} alt="" />
                    <div className="delete-message-username-content">
                        <p className="delete-message-username">{message.User.username}<span className="delete-message-datetime">{formattedDate}</span></p>
                        <div className="channel-content-message">{message.content}{message.updatedAt !== message.createdAt && <span className="message-edited-true">(edited)</span>}</div>
                    </div>
                </div>
            </div>
            <div className="delete-message-cancel-submit-container">
                <p className="delete-message-cancel" onClick={onClose}>Cancel</p>
                <button className={`delete-message-button`} >Delete</button>    
            </div>
        </form>
    );
}

export default DeleteMessageForm;
