import './ServerPopupMessage.css'

function ServerPopupMessage({ content }) {
    return ( 
        <div className="server-popup">
            <div className="popup-speech-corner"></div>
            <span className="server-text">{content}</span>
        </div>
    );
}

export default ServerPopupMessage;
