import './ServerSettingsOverlay.css'

function ServerSettingsOverlay({ server, onClose }) {
    return ( 
        <div className="overlay-container">
            <div className="overlay-options"></div>
            <div className="overlay-info">
                <h1>Server Name: {server.name}</h1>
                <div onClick={onClose} className="close-settings">x</div>
            </div>
        </div>
    );
}

export default ServerSettingsOverlay;
