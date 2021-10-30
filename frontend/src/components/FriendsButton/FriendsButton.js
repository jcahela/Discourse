import './FriendsButton.css'

function FriendsButton({ setChannelSelected }) {
    const sampleServerSelected = {
        id: 0
    }

    const setFriendsChannel = () => {
        setChannelSelected(false);
    }

    return ( 
        <div onClick={setFriendsChannel} className={`friends-button-container friends-container-active-${sampleServerSelected.id === 0}`}>
            <span className={`material-icons friends-icon friends-icon-active-${sampleServerSelected.id === 0}`}>emoji_people</span>
            <p className={`friends-button-text friends-button-text-active-${sampleServerSelected.id === 0}`}>Friends</p>
        </div>
    );
}

export default FriendsButton;
