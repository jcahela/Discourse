import ServerPopupMessage from '../ServerPopupMessage';
import { useState, useEffect, useRef } from 'react';
import './ServerButton.css'

function ServerButton({ server, setServerSelected, serverSelected }) {
    const [showServerPopup, setShowServerPopup] = useState(false);
    const [noPicContent, setNoPicContent] = useState('');
    const serverButtonContainerRef = useRef();
    const serverButtonNoPicRef = useRef();
    const serverButtonPicRef = useRef();

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

    useEffect(() => {
        if (serverSelected?.id === server.id) {
            serverButtonContainerRef.current.classList.add('server-button-container-active')
            serverButtonNoPicRef.current?.classList.add('server-button-no-pic-active')
            serverButtonPicRef.current?.classList.add('server-button-pic-active')
        } else {
            serverButtonContainerRef.current.classList.remove('server-button-container-active')
            serverButtonNoPicRef.current?.classList.remove('server-button-no-pic-active')
            serverButtonPicRef.current?.classList.remove('server-button-pic-active')
        }
    })

    return (
        <div className="server-button-holder">
            <div 
                onMouseOver={showPopupMessage} 
                onMouseLeave={hidePopupMessage}
                onClick={() => setServerSelected(server)}
                className="server-button-container"
                ref={serverButtonContainerRef}
            >
                {server.serverPicture ? (
                    <img ref={serverButtonPicRef} className="server-button-pic-content" src={server.serverPicture} alt="" />
                ):(
                    <span ref={serverButtonNoPicRef} className="server-button-no-pic-content">{noPicContent}</span>
                )}
            </div>
            { showServerPopup && (
                <ServerPopupMessage content={server.name} />
            )}
        </div>
    );
}

export default ServerButton;
