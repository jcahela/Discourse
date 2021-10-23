import { csrfFetch } from "./csrf";

const RESTORE_CHANNELS = 'channels/RESTORE_CHANNELS'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'

const restoreChannels = (channels) => ({
    type: RESTORE_CHANNELS,
    payload: channels
});

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    payload: channel
})

export const restoreChannelsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/channels`)

    if (response.ok) {
        const channels = await response.json();
        await dispatch(restoreChannels(channels));
        return null
    }
}

export const addChannelThunk = (channel) => async (dispatch) => {
    const { name, serverId } = channel;
    const response = await csrfFetch(`/api/channels`, {
        method: "POST",
        body: JSON.stringify({
            name,
            serverId
        })
    });

    if (response.ok) {
        const channel = await response.json();
        await dispatch(addChannel(channel));
        return null;
    } else {
        const data = await response.json();
        if (data.errors) return data;
    }
}

const initialState = { }

function channelsReducer(state = initialState, action) {
    let newState = { ...state }
    switch(action.type) {
        case RESTORE_CHANNELS:
            const channels = action.payload;
            channels.forEach(channel => {
                newState[channel.id] = channel;
            })
            return newState;
        case ADD_CHANNEL:
            const channel = action.payload;
            newState[channel.id] = channel;
            return newState;
        default:
            return state;
    }
}

export default channelsReducer;
