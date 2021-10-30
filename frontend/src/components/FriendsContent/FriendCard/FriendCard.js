import './FriendCard.css'

function FriendCard({ friend }) {
    return ( 
        <div className="friend-card-container">
            <div className="friend-image-container">
                <img src={friend.profilePicture} alt="" className="friend-profile-picture" />
                <div className={`friend-online-status-indicator-${friend.onlineStatus}`}>
                    <div className="offline-friend-inner"></div>
                </div>
            </div>
            <div className="friend-info-container">    
                <p className="friend-username">{friend.username}</p>
                <p className="friend-online-status">{friend.onlineStatus ? 'Online': 'Offline'}</p>
            </div>
        </div>
     );
}

export default FriendCard;
