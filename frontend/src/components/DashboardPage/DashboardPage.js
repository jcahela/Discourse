import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import NewServerButton from '../NewServerButton';
import ServerButton from '../ServerButton/ServerButton';
import ServerSettingsDropdown from '../ServerSettingsDropdown/ServerSettingsDropdown';
import ServerSettingsOverlay from '../ServerSettingsOverlay';

import { Modal } from '../../context/Modal';
import './DashboardPage.css'

function DashboardPage() {
    const [channelsExist, setChannelsExist] = useState(false)
    const [serverSelected, setServerSelected] = useState(null);
    const [showServerSettingsMenu, setShowServerSettingsMenu] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const serversArr = useSelector(state => Object.values(state.servers).sort((a, b) => (a.createdAt < b.createdAt ? 1: -1)))

    const openMenu = () => {
        if (showServerSettingsMenu) return;
        if (!serverSelected) return;
        if (serverSelected?.ownerId !== sessionUser.id) return;
        setShowServerSettingsMenu(true);
      };

    useEffect(() => {
    if (!showServerSettingsMenu) return;

    const closeMenu = () => {
        setShowServerSettingsMenu(false);
    };

    document.addEventListener('click', closeMenu);
    
    return () => document.removeEventListener("click", closeMenu);
    }, [showServerSettingsMenu]);

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
                { serverSelected && <div className="server-name-container" onClick={openMenu}>
                    <h1 className="server-name">{serverSelected?.name}</h1>
                    {serverSelected?.ownerId === sessionUser.id && (
                        <div className="server-options-icon-container">
                            {showServerSettingsMenu ? (
                                <span className="material-icons server-options-icon">close</span>
                            ):(
                                <span className="material-icons server-options-icon">expand_more</span>
                            )}
                        </div>)}
                    {showServerSettingsMenu && (
                        <ServerSettingsDropdown setShowModal={setShowModal}/>
                    )}
                    { showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <ServerSettingsOverlay server={serverSelected} onClose={() => setShowModal(false)}/>
                        </Modal>
                    )}
                </div>}
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
