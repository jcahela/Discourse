import { useState } from 'react';
import ImageDropzone from '../ImageDropzone';
import './NewServerForm.css'

function NewServerForm() {
    const [serverName, setServerName] = useState('')
    const [image, setImage] = useState(null)

    console.log(image)

    const submitNewServer = async (e) => {
        e.preventDefault();
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
                </label>
                <button className="new-server-button" type="submit">Create Server</button>

            </form>
        </div>
    );
}

export default NewServerForm;
