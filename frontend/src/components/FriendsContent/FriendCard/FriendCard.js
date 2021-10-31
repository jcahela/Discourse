import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import './FriendCard.css'

function FriendCard({ friend, socket }) {
    const [showConfirmDeleteFriend, setShowConfirmDeleteFriend] = useState(false);
    const [showFriendOptionsMenu, setShowFriendOptionsMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!showFriendOptionsMenu) return;
    
        const closeMenu = () => {
            setShowFriendOptionsMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
      }, [showFriendOptionsMenu]);

    const removeFriend = () => {
        socket.emit('remove-friendship', {
            user1Id: sessionUser.id,
            user2Id: friend.id
        })
    }

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
            <div onClick={() => setShowFriendOptionsMenu(true)} className="friend-options-container">
                <span class="material-icons friend-options-icon">more_vert</span>
                { showFriendOptionsMenu &&
                    <div className="friend-options-menu-container">
                        <div onClick={() => setShowConfirmDeleteFriend(true)} className="remove-friend-button-container">
                            <p className="remove-friend-button">Remove Friend</p>
                        </div>
                    </div>
                }
            </div>
            { showConfirmDeleteFriend &&
                <Modal onClose={() => setShowConfirmDeleteFriend(false)}>
                    <div className="remove-friend-confirm-container">
                        <h1 className="remove-friend-confirm-header">Remove '{friend.username}'</h1>
                        <p className="remove-friend-confirm-message">Are you sure you want to permanently remove <span className="remove-friend-confirm-username">{friend.username}</span> from your friends?</p>
                        <div className="remove-friend-options-container">
                            <div className="remove-friend-cancel-button-container">
                                <p onClick={() => setShowConfirmDeleteFriend(false)} className="remove-friend-cancel-text">Cancel</p>
                            </div>
                            <div onClick={removeFriend} className="remove-friend-confirm-button-container">
                                <p className="remove-friend-confirm-text">Remove Friend</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </div>
     );
}

export default FriendCard;
