import { csrfFetch } from "./csrf";

const RESTORE_SERVERS = 'servers/RESTORE_SERVERS'
const ADD_SERVER = 'servers/ADD_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

const restoreServers = (servers) => ({
    type: RESTORE_SERVERS,
    payload: servers
})

const addServer = (server) => ({
    type: ADD_SERVER,
    payload: server
})

const editServer = (server) => ({
    type: EDIT_SERVER,
    payload: server
})

const deleteServer = (server) => ({
    type: DELETE_SERVER,
    payload: server
})

export const restoreServersThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/servers`)

    if (response.ok) {
        const servers = await response.json();
        await dispatch(restoreServers(servers));
        return null
    }
}

export const addServerThunk = (image, serverName) => async (dispatch) => {
    const formData = new FormData();
    formData.append("serverName", serverName);
    
    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/servers`, {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(addServer(data))
        return null;
    } else {
        const data = await response.json();
        if (data.errors) return data
    }
}

export const editServerThunk = ({image, serverName, serverId}) => async (dispatch) => {
    const formData = new FormData();
    formData.append("serverName", serverName);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/servers/${serverId}`, {
        method: "PATCH",
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(editServer(data))
        return data;
    } else {
        const data = await response.json();
        if (data.errors) return data;
    }
}

export const deleteServerThunk = (serverId) => async (dispatch) => {
    const response = await csrfFetch(`/api/servers/${serverId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(deleteServer(data));
        return null; 
    } else {
        return ['Something went wrong. Please refresh and try again']
    }
}

const initialState = { }

function serversReducer(state = initialState, action) {
    let newState = { ...state }
    switch(action.type) {
        case ADD_SERVER:
            const newServer = action.payload;
            newState[newServer.id] = newServer;
            return newState;
        case RESTORE_SERVERS:
            const servers = action.payload;
            servers.forEach(server => {
                newState[server.id] = server
            })
            return newState;
        case EDIT_SERVER:
            const serverEdit = action.payload;
            newState[serverEdit.id] = serverEdit;
            return newState;
        case DELETE_SERVER:
            const serverDelete = action.payload;
            delete newState[serverDelete.id]
            return newState;
        default:
            return state;
    }
}

export default serversReducer;
