import UserInfoCard from '../UserInfoCard';
import { useState, useEffect } from 'react';
import './OfflineUserCard.css'

function OfflineUserCard({ user }) {
    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
        if (!showUserInfo) return;
    
        const closeMenu = () => {
            setShowUserInfo(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
    }, [showUserInfo]);

    return ( 
        <div onClick={() => setShowUserInfo(!showUserInfo)} className="offline-user-container">
            <img className="offline-user-profile-picture" src={user.profilePicture} alt="" />
            <h1 className="offline-user-username">{user.username}</h1>
            { showUserInfo &&
                <UserInfoCard user={user}/>
            }
        </div>
    );
}

export default OfflineUserCard;
