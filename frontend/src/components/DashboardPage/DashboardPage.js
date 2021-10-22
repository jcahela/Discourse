import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import NewServerButton from '../NewServerButton';
import ServerButton from '../ServerButton/ServerButton';
import './DashboardPage.css'

function DashboardPage() {
    const [channelsExist, setChannelsExist] = useState(false)
    const [serverSelected, setServerSelected] = useState(null);
    const sessionUser = useSelector(state => state.session.user)
    const serversArr = useSelector(state => Object.values(state.servers).sort((a, b) => (a.createdAt < b.createdAt ? 1: -1)))

    return ( 
        <div className="dashboard-page-container">
            <div className="server-container">
                {serversArr.map(server => (
                    <ServerButton 
                        key={server.id} 
                        server={server} 
                        setServerSelected={setServerSelected} 
                        serverSelected={serverSelected}
                    />
                ))}
                <NewServerButton />
            </div>
            <div className="channel-container">
                <div className="server-name-container">
                    <h1 className="server-name">{serverSelected?.name}</h1>
                    {serverSelected?.ownerId === sessionUser.id && (
                        <div className="server-options-icon-container">
                            <span className="material-icons server-options-icon">expand_more</span>
                        </div>)}
                </div>
                <div className="session-user-container">
                    <img className="session-user-profile-pic" src={sessionUser.profilePicture} alt="" />
                    <p className="session-user-username">{sessionUser.username}</p>
                    <ProfileButton user={sessionUser}/>
                </div>
            </div>
            <div className="chat-container">
                { !channelsExist && (
                    <>
                        <img src="https://cdn.discordapp.com/attachments/886336420552269847/900587720794050640/Blank_Server_Background.PNG" alt="" />
                        <p className="chat-background-text">No channels exist...yet</p>    
                    </>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
