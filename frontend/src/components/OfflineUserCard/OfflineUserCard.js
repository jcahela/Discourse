import './OfflineUserCard.css'

function OfflineUserCard({ user }) {
    return ( 
        <div className="offline-user-container">
            <img className="offline-user-profile-picture" src={user.profilePicture} alt="" />
            <h1 className="offline-user-username">{user.username}</h1>
        </div>
    );
}

export default OfflineUserCard;
