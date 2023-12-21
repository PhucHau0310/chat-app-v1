import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isLoading: false,
            error: false,
        },
        register: {
            success: false,
            isLoading: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isLoading = false;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isLoading = true;
        },
        registerSuccess: (state) => {
            state.register.success = true;
            state.register.isLoading = false;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isLoading = false;
            state.register.error = true;
        },
        logoutStart: (state) => {
            state.login.isLoading = true;
        },
        logoutSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerFailed,
    registerSuccess,
    registerStart,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;
