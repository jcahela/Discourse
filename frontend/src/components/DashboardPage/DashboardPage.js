import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import NewServerButton from '../NewServerButton';
import ServerButton from '../ServerButton/ServerButton';
import ServerSettingsDropdown from '../ServerSettingsDropdown/ServerSettingsDropdown';
import SettingsOverlay from '../SettingsOverlay';
import NewChannelForm from '../NewChannelForm';
import ChannelButton from '../ChannelButton';

import { Modal } from '../../context/Modal';
import './DashboardPage.css'

function DashboardPage() {
    const [channelsExist, setChannelsExist] = useState(false)
    const [serverSelected, setServerSelected] = useState(null);
    const serverFromState = useSelector(state => state.servers[serverSelected?.id])
    const [showServerSettingsMenu, setShowServerSettingsMenu] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [showNewChannelModal, setShowNewChannelModal] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const serversArr = useSelector(state => Object.values(state.servers).sort((a, b) => (a.createdAt < b.createdAt ? 1: -1)))
    const channelsArr = useSelector(state => Object.values(state.channels).filter(channel => channel.serverId === serverFromState?.id).sort((a, b) => a.createdAt < b.createdAt ? 1: -1))

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

    const currentUserIsOwner = serverFromState?.ownerId === sessionUser.id
    

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
                { serverFromState && 
                    <div className="server-name-container" onClick={openMenu}>
                        <h1 className="server-name">{serverFromState?.name}</h1>
                        { currentUserIsOwner && 
                            <div className="server-options-icon-container">
                                {showServerSettingsMenu ? (
                                    <span className="material-icons server-options-icon">close</span>
                                ):(
                                    <span className="material-icons server-options-icon">expand_more</span>
                                )}
                            </div>
                        }
                        {showServerSettingsMenu && (
                            <ServerSettingsDropdown setShowModal={setShowSettingsModal}/>
                        )}
                        { showSettingsModal && (
                            <Modal onClose={() => setShowSettingsModal(false)}>
                                <SettingsOverlay server={serverFromState} onClose={() => setShowSettingsModal(false)} setServerSelected={setServerSelected}/>
                            </Modal>
                        )}
                    </div>
                }
                { serverFromState && 
                    <div className="text-channels-container">
                        <div className="text-channels-header-container">
                            <p className="text-channels-header">TEXT CHANNELS</p>
                            <div className="new-text-channel-button-container">
                                { currentUserIsOwner && <span onClick={() => setShowNewChannelModal(true)} className="material-icons new-channel-button">add</span>}
                                { showNewChannelModal && 
                                    <Modal onClose={() => setShowNewChannelModal(false)}>
                                        <NewChannelForm server={serverFromState} onClose={() => setShowNewChannelModal(false)}/>
                                    </Modal>
                                }
                            </div>
                        </div>
                        {channelsArr.map((channel, index) => (
                            <ChannelButton key={index} channel={channel} />
                        ))}
                    </div>
                }



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
