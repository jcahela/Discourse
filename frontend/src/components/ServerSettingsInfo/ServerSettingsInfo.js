import { useEffect, useState, useRef } from 'react';
import { editServerThunk } from '../../store/servers';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './ServerSettingsInfo.css'

function ServerSettingsInfo({ server, onClose, setServerSelected }) {
    const dispatch = useDispatch();
    const imageRef = useRef();
    const noPicRef = useRef();
    const serverFromState = useSelector(state => state.servers[server.id])
    const [noPicContent, setNoPicContent] = useState('');
    const [changeIconMessage, setShowChangeIconMessage] = useState(false)
    const [serverName, setServerName] = useState(serverFromState?.name)
    const [image, setImage] = useState(serverFromState?.serverPicture)
    const [imageChanged, setImageChanged] = useState(false);
    const [serverEditErrors, setServerEditErrors] = useState([])
    const [nameCharacterCounter, setNameCharacterCounter] = useState(50 - serverName.length)

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
    
    const resetValue = (e) => {
        e.target.value = null;
    }

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

    const removeImage = (e) => {
        setImage(null);
        if (serverFromState?.serverPicture === null) {
            setImageChanged(false)
        }  else {
            setImageChanged(true)
        }
    }

    const submitEdit = async (e) => {
        e.preventDefault();
        if (serverNameContainsOnlySpaces && serverName.length > 0) {
            setServerEditErrors(['Server name cannot contain only spaces.']);
            return;
        }
        const data = await dispatch(editServerThunk({
            image,
            serverName,
            serverId: server.id
        }))
        if (data.errors) {
            setServerEditErrors(data.errors);
            return
        } else {
            setServerSelected(data)
            onClose();
        }
    }

    const updateServerName = (e) => {
        setServerName(e.target.value);
        setNameCharacterCounter(50 - e.target.value.length);
    }

    const serverNameChanged = serverName !== serverFromState?.name
    const serverNameContainsOnlySpaces = serverName.replace(/\s/g, '').length === 0

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
                    <input className="server-settings-icon-file-input" onClick={resetValue} onChange={updateFile} type="file" />
                </label>
                <div onClick={removeImage} className="remove-image-button">Remove Image</div>
                <label className="server-settings-name-label">
                    Server Name
                    <input 
                        type="text"
                        value={serverName}
                        onChange={updateServerName} 
                        className="server-settings-name-input"
                    />
                    <p className={`server-edit-name-character-counter server-edit-character-length-exceeded-${nameCharacterCounter < 0}`}>{nameCharacterCounter}</p>
                    {serverEditErrors.map((error, index) => (
                        <div className="server-edit-errors" key={index}>
                            {error}
                        </div>
                    ))}
                </label>
                <button className={`server-settings-save-button disabled-${!imageChanged && !serverNameChanged}`} disabled={!imageChanged && !serverNameChanged}>Save Changes</button>
            </form>
        </>
    );
}

export default ServerSettingsInfo;
