import { csrfFetch } from "./csrf.js";

const GET_USERS = 'users/GET_USERS';
const UPDATE_USER = 'users/UPDATE_USER';

const restoreUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
})

export const restoreUsersThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users`);

    if (response.ok) {
        const users = await response.json();
        await dispatch(restoreUsers(users));
        return null;
    }
}

const initialState = { };

function usersReducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
      case GET_USERS:
        const users = action.payload;
        users.forEach(user => {
            newState[user.id] = user
        });
        return newState;
      case UPDATE_USER:
        const user = action.payload;
        newState[user.id] = user;
        return newState;
      default:
        return state;
    }
  }
  
  export default usersReducer;
  