// import ServerPopupMessage from '../ServerPopupMessage';
import { useState, useEffect, useRef } from 'react';
import './ServerButton.css'

function ServerButton({ server, setServerSelected, serverSelected, setChannelSelected, setShowChannelSettingsIcon }) {
    // const [showServerPopup, setShowServerPopup] = useState(false);
    const [noPicContent, setNoPicContent] = useState('');
    const [whiteLine, setWhiteLine] = useState(false);
    const [whiteLineActive, setWhiteLineActive] = useState(false);
    const serverButtonContainerRef = useRef();
    const serverButtonNoPicRef = useRef();
    const serverButtonPicRef = useRef();
    const whiteLineRef = useRef();

    const showPopupMessage = () => {
        // setShowServerPopup(true);
        setWhiteLine(true);
    }

    const hidePopupMessage = () => {
        // setShowServerPopup(false)
        setWhiteLine(false);
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
    }, [server.name])

    useEffect(() => {
        if (serverSelected?.id === server.id) {
            serverButtonContainerRef.current.classList.add('server-button-container-active')
            serverButtonNoPicRef.current?.classList.add('server-button-no-pic-active')
            serverButtonPicRef.current?.classList.add('server-button-pic-active')
            setWhiteLineActive(true);
        } else {
            serverButtonContainerRef.current.classList.remove('server-button-container-active')
            serverButtonNoPicRef.current?.classList.remove('server-button-no-pic-active')
            serverButtonPicRef.current?.classList.remove('server-button-pic-active')
            setWhiteLineActive(false);
        }
    }, [serverSelected?.id, server?.id])

    const setSelected = () => {
        setServerSelected(server);
        setWhiteLineActive(true);
        setChannelSelected(null);
        setShowChannelSettingsIcon(false)
    }

    return (
        <div className="server-button-holder">
            <div ref={whiteLineRef} className={`white-line-effect white-line-${whiteLine} white-line-active-${whiteLineActive}`}></div>

            <div 
                onMouseOver={showPopupMessage} 
                onMouseLeave={hidePopupMessage}
                onClick={setSelected}
                className="server-button-container"
                ref={serverButtonContainerRef}
            >
                {server.serverPicture ? (
                    <img ref={serverButtonPicRef} className="server-button-pic-content" src={server.serverPicture} alt="" />
                ):(
                    <span ref={serverButtonNoPicRef} className="server-button-no-pic-content">{noPicContent}</span>
                )}
            </div>
            {/* { showServerPopup && (
                <ServerPopupMessage content={server.name} />
            )} */}
        </div>
    );
}

export default ServerButton;
