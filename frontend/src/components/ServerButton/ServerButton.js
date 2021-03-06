import { useState, useEffect, useRef } from 'react';
import './ServerButton.css'

function ServerButton({ server, setServerSelected, serverSelected, setChannelSelected }) {
    const [noPicContent, setNoPicContent] = useState('');
    const [whiteLine, setWhiteLine] = useState(false);
    const [whiteLineActive, setWhiteLineActive] = useState(false);
    const serverButtonContainerRef = useRef();
    const serverButtonNoPicRef = useRef();
    const serverButtonPicRef = useRef();
    const whiteLineRef = useRef();

    useEffect(() => {
        const serverName = server.name.trim();
        const serverNameArr = serverName.split(' ');

        let serverNameInitials = '';

        for (let i = 0; i < serverNameArr.length; i++) {
            const serverWord = serverNameArr[i]
            const initial = serverWord[0];
            if (!initial) {
                continue;
            }
            serverNameInitials += initial;
        }

        setNoPicContent(serverNameInitials);
    }, [server.name])

    useEffect(() => {
        if (serverSelected?.id === server.id) {
            serverButtonContainerRef.current.classList.add('server-button-container-active')
            setWhiteLineActive(true);
        } else {
            serverButtonContainerRef.current.classList.remove('server-button-container-active')
            setWhiteLineActive(false);
        }
        if (server.id === 0) {
            serverButtonPicRef.current.style.objectFit = "scale-down";
        }
    }, [serverSelected?.id, server?.id])

    const setSelected = () => {
        if (serverSelected?.id === server?.id) {
            return;
        }
        setServerSelected(server);
        setWhiteLineActive(true);
        setChannelSelected(null);
    }

    return (
        <div className="server-button-holder">
            <div ref={whiteLineRef} className={`white-line-effect white-line-${whiteLine} white-line-active-${whiteLineActive}`}></div>

            <div 
                onMouseOver={() => setWhiteLine(true)} 
                onMouseLeave={() => setWhiteLine(false)}
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
        </div>
    );
}

export default ServerButton;
