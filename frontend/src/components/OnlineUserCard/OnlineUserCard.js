import './OnlineUserCard.css'

function OnlineUserCard({ user }) {
    return ( 
        <div className="online-user-container">
            <div className="online-user-image-container">
                <img className="online-user-profile-picture" src={user.profilePicture} alt="" />
                <div className="online-green-status-indicator"></div>
            </div>
            <h1 className="online-user-username">{user.username}</h1>
        </div>
    );
}

export default OnlineUserCard;
