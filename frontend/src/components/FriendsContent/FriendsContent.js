import { useState } from 'react';
import { useSelector } from 'react-redux';
import './FriendsContent.css'

function FriendsContent() {
    const [friendsCategory, setFriendsCategory] = useState('online');
    
    return ( 
        <div className="friends-content-container">
            <div className="friends-content-navigator">
                <span className={`material-icons navigator-friends-icon`}>emoji_people</span>
                <p className={`navigator-friends-button-text`}>Friends</p>
                <div className="navigator-divider"></div>

                <div onClick={() => setFriendsCategory('online')} className={`friends-link-container friends-online-link-container friend-category-${friendsCategory === 'online'}`}>
                    <p className={`friends-navigator-link friends-content-navigator-online friend-link-${friendsCategory === 'online'}`}>Online</p>
                </div>

                <div onClick={() => setFriendsCategory('all')} className={`friends-link-container friends-all-container friend-category-${friendsCategory === 'all'}`}>
                    <p className={`friends-navigator-link friends-content-navigator-all friend-link-${friendsCategory === 'all'}`}>All</p>
                </div>
                
                <div onClick={() => setFriendsCategory('pending')} className={`friends-link-container friends-pending-container friend-category-${friendsCategory === 'pending'}`}>
                    <p className={`friends-navigator-link friends-content-navigator-pending friend-link-${friendsCategory === 'pending'}`}>Pending</p>
                </div>
            </div>
        </div>
    );
}

export default FriendsContent;
