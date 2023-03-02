import { csrfFetch } from "./csrf.js";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (credential, password) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  if (response.ok) {
    const data = await response.json();
    await dispatch(setUser(data));
    return null;
  } else {
    if (response.status < 500) {
      const data = await response.json();
      console.log(data);
      if (data.errors) return data
    }
  }
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (email, username, password) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    await dispatch(setUser(data.user))
    return null
  } else {
    if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data
    }
  }
};

export const signupWithPicture = (image, email, username, password) => async (dispatch) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/users/profile-picture`, {
    method: "POST",
    headers: {"Content-Type": "multipart/form-data"},
    body: formData
  })

  if (response.ok) {
    const data = await response.json();
    await dispatch(setUser(data.user));
    return null;
  } else {
    if (response.status < 500) {
      const data = await response.json();
      if (data.errors) return data
    }
  }

}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      if (action.payload === undefined) {
        return state;
      }
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
