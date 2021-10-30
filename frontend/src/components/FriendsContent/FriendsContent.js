import { useState } from 'react';
import { useSelector } from 'react-redux';
import FriendCard from './FriendCard';
import RequestCard from './RequestCard';
import './FriendsContent.css'

function FriendsContent() {
    const [friendsCategory, setFriendsCategory] = useState('online');
    const onlineFriendsArr = useSelector(state => [...state.session.user.Friends1, ...state.session.user.Friends2].filter(user => user.onlineStatus === true))
    const allFriendsArr = useSelector(state => [...state.session.user.Friends1, ...state.session.user.Friends2])
    const friendRequestsArr = useSelector(state => state.session.user.Requests)
    
    console.log(friendRequestsArr)

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
                    { friendRequestsArr.length > 0 && 
                        <div className="pending-requests-count">{friendRequestsArr.length}</div>
                    }
                </div>
            </div>
            <div className="friends-lists-container">
                { friendsCategory === 'online'  &&
                    <>
                        <p className="friends-status-header">ONLINE -- {onlineFriendsArr.length}</p>
                        {onlineFriendsArr.map(onlineFriend => (
                            <FriendCard key={onlineFriend.id} friend={onlineFriend} />
                        ))}
                    </>
                }

                { friendsCategory === 'all' && 
                    <>
                        <p className="friends-status-header">ALL FRIENDS -- {allFriendsArr.length}</p>
                        {allFriendsArr.map(friend => (
                            <FriendCard key={friend.id} friend={friend} />
                        ))}
                    </>
                }

                { friendsCategory === 'pending' && friendRequestsArr.length > 0 && (
                    <>
                        <p className="friends-status-header">PENDING -- {friendRequestsArr.length}</p>
                        {friendRequestsArr.map(friendRequest => (
                            <RequestCard requestUser={friendRequest} />
                        ))}
                    </>
                )}
                { friendsCategory === 'pending' && friendRequestsArr.length === 0 && (
                    <div className="no-friend-requests-container">
                        <img src="https://cdn.discordapp.com/attachments/886336420552269847/904109968293265440/unknown.png" alt="" className="no-friend-requests-image" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendsContent;
