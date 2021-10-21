import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import NewServerButton from '../NewServerButton';
import './DashboardPage.css'

function DashboardPage() {
    const [channelsExist, setChannelsExist] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const servers = useSelector(state => state.servers)
    
    return ( 
        <div className="dashboard-page-container">
            <div className="server-container">
                <NewServerButton />
            </div>
            <div className="channel-container">
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
