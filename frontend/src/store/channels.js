import { csrfFetch } from "./csrf";

const RESTORE_CHANNELS = 'channels/RESTORE_CHANNELS'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL'

const restoreChannels = (channels) => ({
    type: RESTORE_CHANNELS,
    payload: channels
});

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    payload: channel
})

const editChannel = (channel) => ({
    type: EDIT_CHANNEL,
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

export const editChannelThunk = (channel) => async (dispatch) => {
    const {id, name, topic} = channel;
    const response = await csrfFetch(`/api/channels/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            name,
            topic
        })
    });

    if (response.ok) {
        const channel = await response.json();
        await dispatch(editChannel(channel));
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
        case EDIT_CHANNEL:
            const channelToUpdate = action.payload;
            newState[channelToUpdate.id] = channelToUpdate;
            return newState;
        default:
            return state;
    }
}

export default channelsReducer;
