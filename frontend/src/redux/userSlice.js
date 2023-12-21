import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            info: null,
            isLoading: false,
            error: false,
        },
        addFriend: {
            success: false,
            isLoading: false,
            error: false,
        },
    },
    reducers: {
        getAllUsersStart: (state) => {
            state.users.isLoading = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.users.info = action.payload;
            state.users.isLoading = false;
            state.users.error = false;
        },
        getAllUsersFailed: (state) => {
            state.users.isLoading = false;
            state.users.error = true;
        },
        addFriendStart: (state) => {
            state.addFriend.isLoading = true;
        },
        addFriendSuccess: (state, action) => {
            state.addFriend.success = true;
            state.addFriend.isLoading = false;
            state.addFriend.error = false;
        },
        addFriendFailed: (state) => {
            state.addFriend.isLoading = false;
            state.addFriend.error = true;
        },
    },
});

export const {
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailed,
    addFriendFailed,
    addFriendSuccess,
    addFriendStart,
} = userSlice.actions;
export default userSlice.reducer;
