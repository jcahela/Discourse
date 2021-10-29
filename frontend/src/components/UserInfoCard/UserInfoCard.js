import { useEffect, useRef } from 'react';
import './UserInfoCard.css'

function UserInfoCard({ user }) {
    const bannerRef = useRef();

    useEffect(() => {
        const colorArr = ['#fc892c','#e7fc2c', '#fc2c2c', '#2cfcf2', '#972cfc', '#f363f8', '#6ff863']
  
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); 
        }

        const randomIndex = getRandomInt(0, 7);

        bannerRef.current.style.backgroundColor = colorArr[randomIndex];
    
    }, [bannerRef])

    return ( 
        <div className="user-info-card-container">
            <div ref={bannerRef} className="user-info-card-banner">
                <div className="user-info-card-profile-picture-container">
                    <img className="user-info-card-profile-picture" src={user.profilePicture} alt="" />
                    { user.onlineStatus ? (
                        <div className="user-info-online-status-online"></div>
                    ):(
                        <div className="user-info-online-status-offline">
                            <div className="user-info-online-status-offline-inner"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="user-info-card-username-container">
                <h1 className="user-info-card-username">{user.username}</h1>
                <p className="user-info-card-email">{user.email}</p>
            </div>
        </div>
     );
}

export default UserInfoCard;
