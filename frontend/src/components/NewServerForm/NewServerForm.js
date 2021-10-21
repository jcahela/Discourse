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
                        onChange={(e) => setServerName(e.target.value)}
                        className="new-server-name-input"
                    />
                    {errors.map((error, index) => (
                        <div key={index} className="server-error-container">
                            <p className="server-error">{error}</p>
                        </div>
                    ))}
                </label>
                <button className="new-server-button" type="submit">Create Server</button>

            </form>
        </div>
    );
}

export default NewServerForm;
