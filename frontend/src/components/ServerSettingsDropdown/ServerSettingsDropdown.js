import './ServerSettingsDropdown.css'

function ServerSettingsDropdown({ setShowModal }) {

    return ( 
        <>
            <div onClick={() => setShowModal(true)} className="server-settings-container">
                <div className="server-settings-button">
                    Server Settings
                    <span className="material-icons server-settings-icon">settings</span>
                </div>
            </div>
        </>
     );
}

export default ServerSettingsDropdown;
