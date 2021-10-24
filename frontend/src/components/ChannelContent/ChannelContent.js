import ChannelWelcomeMessage from '../ChannelWelcomeMessage';

import './ChannelContent.css'

function ChannelContent({ channel, setChannelSelected }) {
    return ( 
        <div className="channel-content-container">

            <div className="channel-content-header-container">
                <span className="channel-content-header-hashtag">#</span>
                <h1 className="channel-content-header">{channel?.name}</h1>
            </div>

            <div className="channel-content-messages-container">
                <ChannelWelcomeMessage channel={channel} setChannelSelected={setChannelSelected}/>
                {/* <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p>
                <p style={{color: 'white'}}>message here to see what it'll look like</p> */}
            </div>

            <div className="channel-content-chat-input-container">

            </div>
        </div>
     );
}

export default ChannelContent;
