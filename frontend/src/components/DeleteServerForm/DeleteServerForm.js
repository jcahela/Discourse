import { useState } from 'react';
import { deleteServerThunk } from '../../store/servers';
import { useDispatch } from 'react-redux';

import './DeleteServerForm.css'

function DeleteServerForm({ server, onCloseOuter, onCloseInner }) {
    const dispatch = useDispatch();
    const [confirmDeleteInput, setConfirmDeleteInput] = useState('');

    const submitServerDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteServerThunk(server.id))
        onCloseInner();
        onCloseOuter();
    }

    return ( 
        <form onSubmit={submitServerDelete} className="delete-server-form">
            <h1 className="delete-server-header">Delete '{server.name}'</h1>
            <p className="delete-server-confirm-message">Are you sure you want to delete <span className="delete-server-confirm-message-name">{server.name}</span>? This action cannot be undone.</p>
            <label className="delete-server-enter-name-label">
                Enter Server Name
                <input 
                    type="text" 
                    value={confirmDeleteInput}
                    onChange={(e) => setConfirmDeleteInput(e.target.value)}
                    className="delete-server-enter-name-input"
                />
            </label>
            <div className="delete-server-cancel-submit-container">
                <p className="delete-server-cancel" onClick={onCloseInner}> Cancel</p>
                <button className={`delete-server-button delete-server-disabled-${confirmDeleteInput !== server.name}`} disabled={confirmDeleteInput !== server.name}>Delete Server</button>    
            </div>
        </form>
     );
}

export default DeleteServerForm;
