import { csrfFetch } from "./csrf";

const RESTORE_MESSAGES = 'messages/RESTORE_MESSAGES'
const ADD_MESSAGE = 'messages/ADD_MESSAGE'

const restoreMessages = (messages) => ({
    type: RESTORE_MESSAGES,
    payload: messages
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const restoreMessagesThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/messages`)

    if (response.ok) {
        const messages = await response.json();
        await dispatch(restoreMessages(messages));
        return null;
    }
}

const initialState = { };

function messagesReducer(state = initialState, action) {
    let newState = { ...state };
    switch(action.type) {
        case RESTORE_MESSAGES:
            const messages = action.payload;
            messages.forEach(message => {
                newState[message.id] = message;
            })
            return newState;
        case ADD_MESSAGE:
            const message = action.payload;
            newState[message.id] = message;
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;
