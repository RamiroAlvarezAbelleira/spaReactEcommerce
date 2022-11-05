import { createSlice } from "@reduxjs/toolkit";

export const EmptyUserState = {
    id: 0,
    name: '',
    email: ''
}

export const persistLocalStorageUser = (userInfo) => {
    localStorage.setItem('user', JSON.stringify({...userInfo}));
}

export const clearLocalStorageUser = () => {
    localStorage.removeItem('user');
}

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : EmptyUserState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorageUser(action.payload)
            return action.payload
        },

        updateUser: (state, action) => {
            persistLocalStorageUser({...state, ...action.payload})
            return {...state, ...action.payload}
        },

        clearUser: () => {
            clearLocalStorageUser()
            return EmptyUserState
        }
    }
})

export const { createUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;