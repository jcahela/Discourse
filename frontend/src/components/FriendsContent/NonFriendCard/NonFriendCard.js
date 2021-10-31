import { useSelector } from 'react-redux'
import './NonFriendCard.css'

function NonFriendCard({ nonFriend, friendRequestSent, socket }) {
    const sessionUser = useSelector(state => state.session.user);

    const sendFriendRequest = (user) => {
        socket.emit('add-friend-request', {
            senderId: sessionUser.id,
            receiverId: user.id
        })
    }

    const cancelRequest = (user) => {
        socket.emit('cancel-friend-request', {
            senderId: sessionUser.id,
            receiverId: user.id
        })
    }

    return ( 
        <div className="nonfriend-card-container">
            <div className="nonfriend-image-container">
                <img src={nonFriend.profilePicture} alt="" className="nonfriend-profile-picture" />
                <div className={`nonfriend-online-status-indicator-${nonFriend.onlineStatus}`}>
                    <div className="offline-nonfriend-inner"></div>
                </div>
            </div>
            <div className="nonfriend-info-container">    
                <p className="nonfriend-username">{nonFriend.username}</p>
                <p className="nonfriend-online-status">{nonFriend.onlineStatus ? 'Online': 'Offline'}</p>
            </div>
            { friendRequestSent ? (
                <button onClick={() => cancelRequest(nonFriend)} className="cancel-friend-request-button">Cancel Request</button>
            ):(
                <button onClick={() => sendFriendRequest(nonFriend)} className="add-friend-button">Send Friend Request</button>
            )}
        </div>
     );
}

export default NonFriendCard;
