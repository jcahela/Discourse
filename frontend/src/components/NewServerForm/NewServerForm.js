import { useState } from 'react';
import ImageDropzone from '../ImageDropzone';
import { addServerThunk } from '../../store/servers';
import { useDispatch } from 'react-redux';

import './NewServerForm.css'

function NewServerForm({ onClose }) {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [nameCharacterCounter, setNameCharacterCounter] = useState(50 - serverName.length)

    const submitNewServer = async (e) => {
        e.preventDefault();
        const data = await dispatch(addServerThunk(
            image,
            serverName
        ))

        if (data) {
            setErrors(data.errors);
            return
        }

        onClose();
    }

    const updateServerName = (e) => {
        setServerName(e.target.value);
        setNameCharacterCounter(50 - e.target.value.length);
    }

    return ( 
        <div className="new-server-form-container">
            <form className="new-server-form" onSubmit={submitNewServer}>
                <h1 className="new-server-header">Create Server</h1>
                <ImageDropzone setImage={setImage}/>
                <label className="new-server-name-label">
                    Server Name
                    <input
                        type="text"
                        value={serverName}
                        onChange={updateServerName}
                        className="new-server-name-input"
                    />
                    <p className={`new-server-name-character-counter new-server-character-length-exceeded-${nameCharacterCounter < 0}`}>{nameCharacterCounter}</p>
                </label>
                {errors.map((error, index) => (
                    <div key={index} className="server-error-container">
                        <p className="server-error">{error}</p>
                    </div>
                ))}
                <button className={`new-server-button new-server-disabled-${/^\s*$/.test(serverName)}`} type="submit" disabled={/^\s*$/.test(serverName)}>Create Server</button>

            </form>
        </div>
    );
}

export default NewServerForm;
