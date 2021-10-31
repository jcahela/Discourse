import { useState, useEffect } from 'react';
import { updateUser } from '../../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { restoreUser } from '../../store/session';
import FriendCard from './FriendCard';
import NonFriendCard from './NonFriendCard';
import RequestCard from './RequestCard';
import './FriendsContent.css'

function FriendsContent({ socket }) {
    const dispatch = useDispatch();
    const [friendsCategory, setFriendsCategory] = useState('online');
    const onlineFriendsArr = useSelector(state => [...state.session.user.Friends1, ...state.session.user.Friends2].filter(user => user.onlineStatus === true))
    const allFriendsArr = useSelector(state => [...state.session.user.Friends1, ...state.session.user.Friends2])
    const friendRequestsArr = useSelector(state => state.session.user.Requests)
    const allUsers = useSelector(state => state.users)
    const sessionUser = useSelector(state => state.session.user)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        socket.on('receive-friend-request-add', requestRecipient => {
            dispatch(updateUser(requestRecipient));
            dispatch(restoreUser());
        });

        socket.on('receive-cancel-friend-request', requestRecipient => {
            dispatch(updateUser(requestRecipient));
            dispatch(restoreUser());
        })

        socket.on('receive-accept-friend-request', friendsToUpdate => {
            const {user1, user2} = friendsToUpdate;
            dispatch(updateUser(user1));
            dispatch(updateUser(user2));
            dispatch(restoreUser());
        })

        socket.on('receive-decline-friend-request', nonFriendsToUpdate => {
            const {user1, user2} = nonFriendsToUpdate;
            dispatch(updateUser(user1));
            dispatch(updateUser(user2));
            dispatch(restoreUser());
        })

        socket.on('receive-remove-friendship', nonFriendsToUpdate => {
            const {user1, user2} = nonFriendsToUpdate;
            dispatch(updateUser(user1));
            dispatch(updateUser(user2));
            dispatch(restoreUser());
        })
    }, [dispatch, socket])

    const notFriendsArr = useSelector(state => {
        const allUsers = Object.values(state.users)
            .filter(user => user.id !== state.session.user.id)
            .filter(user => user.username.toLowerCase().startsWith(searchInput.toLowerCase()))

        const friendIndexes = [];
        
        allFriendsArr.forEach(friend => friendIndexes.push(friend.id));
        
        const nonFriendUsers = allUsers.filter(user => !friendIndexes.includes(user.id))
        return nonFriendUsers
    });

    const preventSubmit = (e) => {
        e.preventDefault();
    }

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

                <div onClick={() => setFriendsCategory('add-friend')} className={`add-friend-container add-friend-category-${friendsCategory === 'add-friend'}`}>Add Friend</div>
            </div>
            <div className="friends-lists-container">
                { friendsCategory === 'online'  &&
                    <div className="online-friends-container">
                        <p className="friends-status-header">ONLINE -- {onlineFriendsArr.length}</p>
                        {onlineFriendsArr.map(onlineFriend => (
                            <FriendCard key={onlineFriend.id} friend={onlineFriend} socket={socket}/>
                        ))}
                    </div>
                }

                { friendsCategory === 'all' && 
                    <div className="all-friends-container">
                        <p className="friends-status-header">ALL FRIENDS -- {allFriendsArr.length}</p>
                        {allFriendsArr.map(friend => (
                            <FriendCard key={friend.id} friend={friend} socket={socket}/>
                        ))}
                    </div>
                }

                { friendsCategory === 'pending' && friendRequestsArr.length > 0 && (
                    <div className="pending-friends-container">
                        <p className="friends-status-header">PENDING -- {friendRequestsArr.length}</p>
                        {friendRequestsArr.map(friendRequest => (
                            <RequestCard key={friendRequest.id} requestUser={friendRequest} socket={socket} />
                        ))}
                    </div>
                )}
                { friendsCategory === 'pending' && friendRequestsArr.length === 0 && (
                    <div className="no-friend-requests-container">
                        <img src="https://cdn.discordapp.com/attachments/886336420552269847/904109968293265440/unknown.png" alt="" className="no-friend-requests-image" />
                    </div>
                )}

                { friendsCategory === 'add-friend' &&
                <>
                    <p className="add-friend-header">ADD FRIEND</p>
                    <p className="add-friend-message">You can add a friend with their username.</p>
                    <form onSubmit={preventSubmit} className="add-friend-form">
                        <input 
                            className="add-friend-input" 
                            type="text" 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder='Enter a Username'
                        />
                        <div className="friend-search-results">
                            {notFriendsArr.map(user => {
                                const userObj = allUsers[user.id];
                                const friendRequestSent = userObj?.Requests?.some(user => user.id === sessionUser.id)
                                return (
                                    <div key={user.id} className="friend-search-result">
                                        <NonFriendCard nonFriend={user} friendRequestSent={friendRequestSent} socket={socket}/>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </form>
                </>
                }
            </div>
        </div>
    );
}

export default FriendsContent;
