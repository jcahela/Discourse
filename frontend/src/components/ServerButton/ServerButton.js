import ServerPopupMessage from '../ServerPopupMessage';
import { useState, useEffect } from 'react';
import './ServerButton.css'

function ServerButton({ server }) {
    const [showServerPopup, setShowServerPopup] = useState(true);
    const [noPicContent, setNoPicContent] = useState('')

    const showPopupMessage = () => {
        setShowServerPopup(true)
    }

    const hidePopupMessage = () => {
        setShowServerPopup(false)
    }

    useEffect(() => {
        const serverName = server.name;
        const serverNameArr = serverName.split(' ');

        let serverNameInitials = '';

        serverNameArr.forEach(serverWord => {
            const initial = serverWord[0];
            serverNameInitials += initial;
        })

        setNoPicContent(serverNameInitials);
    })

    return (
        <div className="server-button-holder">
            <div onMouseOver={showPopupMessage} onMouseLeave={hidePopupMessage} className="server-button-container">
                {server.serverPicture ? (
                    <img className="server-button-pic-content" src={server.serverPicture} alt="" />
                ):(
                    <span className="server-button-no-pic-content">{noPicContent}</span>
                )}
            </div>
            { showServerPopup && (
                <ServerPopupMessage content={server.name} />
            )}
        </div>
    );
}

export default ServerButton;
