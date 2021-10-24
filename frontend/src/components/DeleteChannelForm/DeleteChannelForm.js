import { useState } from 'react';
import { deleteChannelThunk } from '../../store/channels';
import { useDispatch } from 'react-redux';
import './DeleteChannelForm.css'

function DeleteChannelForm({ channel, onCloseOuter, onCloseInner }) {
    const dispatch = useDispatch();
    const [deleteChannelError, setDeleteChannelError] = useState('')

    const deleteChannel = async (e) => {
        e.preventDefault();
        const data = await dispatch(deleteChannelThunk(channel.id));
        if (data) {
            setDeleteChannelError(data);
        } else {
            onCloseInner();
            onCloseOuter();
        }
    }

    return ( 
        <form onSubmit={deleteChannel} className="delete-channel-form">
            <h1 className="delete-channel-header">Delete Channel</h1>
            <p className="delete-channel-confirm-message">
                Are you sure you want to delete #
                <span className="delete-channel-name">{channel.name}</span>
                ? This action cannot be undone.
            </p>
            <div className="delete-channel-cancel-submit-container">
                <p className="delete-channel-cancel" onClick={onCloseInner}> Cancel</p>
                <button className={`delete-channel-button`}>Delete Channel</button>  
                <p className="delete-channel-error">{deleteChannelError}</p>  
            </div>
        </form>
    );
}

export default DeleteChannelForm;
