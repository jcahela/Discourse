import UserInfoCard from '../UserInfoCard';
import { useState, useEffect } from 'react';

import './OnlineUserCard.css'

function OnlineUserCard({ user }) {
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
        <div onClick={() => setShowUserInfo(!showUserInfo)} className="online-user-container">
            <div className="online-user-image-container">
                <img className="online-user-profile-picture" src={user.profilePicture} alt="" />
                <div className="online-green-status-indicator"></div>
            </div>
            <h1 className="online-user-username">{user.username}</h1>
            { showUserInfo &&
                <UserInfoCard user={user}/>
            }
        </div>
    );
}

export default OnlineUserCard;
