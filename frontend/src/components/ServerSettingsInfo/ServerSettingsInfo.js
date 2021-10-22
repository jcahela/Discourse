import { useEffect, useState, useRef } from 'react';
import './ServerSettingsInfo.css'

function ServerSettingsInfo({ server }) {
    const imageRef = useRef();
    const noPicRef = useRef();
    const [noPicContent, setNoPicContent] = useState('');
    const [changeIconMessage, setShowChangeIconMessage] = useState(false)
    const [serverName, setServerName] = useState(server.name)
    const [image, setImage] = useState(server.serverPicture)
    const [imageChanged, setImageChanged] = useState(false);

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
    
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageChanged(true)
            setImage(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                imageRef.current.src = reader.result
            }
        }
    }

    const showChangeIconMessage = () => {
        setShowChangeIconMessage(true);
        if (noPicRef.current) noPicRef.current.innerText = ''
    }

    const removeChangeIconMessage = () => {
        setShowChangeIconMessage(false);
        if (noPicRef.current) noPicRef.current.innerText = noPicContent;
    }

    const removeImage = () => {
        setImage(null);
        if (server.serverPicture === null) {
            setImageChanged(false)
        }  else {
            setImageChanged(true)
        }
    }

    const submitEdit = (e) => {
        e.preventDefault();
        console.log('hi')
    }

    return ( 
        <>
            <form onSubmit={submitEdit} className="server-settings-form">
                <label className="server-settings-icon-label">
                    <div onMouseOver={showChangeIconMessage} onMouseLeave={removeChangeIconMessage} className="server-settings-pic-container">
                        {image ? (
                            <img ref={imageRef} className="server-settings-info-pic" src={image} alt="" />
                        ): (
                            <div ref={noPicRef} className="server-settings-info-no-pic">{noPicContent}</div>
                        )}
                        { changeIconMessage && <div className="change-icon-message">CHANGE ICON</div>}
                        <span className="material-icons insert-photo-icon">insert_photo</span>
                    </div>
                    <input className="server-settings-icon-file-input" onChange={updateFile} type="file" />
                </label>
                <div onClick={removeImage} className="remove-image-button">Remove Image</div>
                <label className="server-settings-name-label">
                    Server Name
                    <input 
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)} 
                        className="server-settings-name-input"
                    />
                </label>
                <button className={`server-settings-save-button disabled-${!imageChanged && serverName === server.name}`} disabled={!imageChanged && serverName === server.name}>Save Changes</button>
            </form>
        </>
    );
}

export default ServerSettingsInfo;
