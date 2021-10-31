import { useSelector } from 'react-redux'
import './RequestCard.css'

function RequestCard({ requestUser, socket }) {
    const sessionUser = useSelector(state => state.session.user);

    const acceptFriendRequest = () => {
        socket.emit('accept-friend-request', {
            senderId: requestUser.id,
            receiverId: sessionUser.id
        })
    }

    const declineFriendRequest = () => {
        socket.emit('decline-friend-request', {
            senderId: requestUser.id,
            receiverId: sessionUser.id
        })
    }

    return ( 
        <div className="friend-request-container">
            <img src={requestUser.profilePicture} alt="" className="friend-request-profile-picture" />
            <div className="friend-request-info-container">
                <h1 className="friend-request-username">{requestUser.username}</h1>
                <p className="friend-request-notifier-message">Incoming Friend Request</p>
            </div>
            <div className="friend-request-options-container">
                <div className="friend-request-accept-container">
                    <span onClick={acceptFriendRequest} className="material-icons friend-request-accept-icon">done</span>
                </div>
                <div className="friend-request-decline-container">
                    <span onClick={declineFriendRequest} className="material-icons friend-request-decline-icon">close</span>
                </div>
            </div>
        </div>
    );
}

export default RequestCard;
