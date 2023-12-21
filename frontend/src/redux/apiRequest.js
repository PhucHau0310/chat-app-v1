import axios from 'axios';
import {
    loginSuccess,
    loginStart,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutFailed,
    logoutStart,
    logoutSuccess,
} from './authSlice';
import {
    addFriendFailed,
    addFriendStart,
    addFriendSuccess,
    getAllUsersFailed,
    getAllUsersStart,
    getAllUsersSuccess,
} from './userSlice';
import {
    conversationFailed,
    conversationStart,
    conversationSuccess,
    getConversationsFailed,
    getConversationsStart,
    getConversationsSuccess,
} from './conversationSlice';

// Auth
export const userLogin = async (dispatch, navigate, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`/v1/auth/login`, user);
        dispatch(loginSuccess(res.data));

        navigate('/home');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const userRegister = async (dispatch, navigate, user) => {
    dispatch(registerStart());
    try {
        await axios.post(`/v1/auth/register`, user);
        dispatch(registerSuccess());

        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logout = async (
    dispatch,
    navigate,
    axiosJWT,
    accessToken,
    userId
) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`/v1/auth/logout`, userId, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());

        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed());
    }
};

// User
export const getAllUsers = async (dispatch, axiosJWT, accessToken) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axiosJWT.get(`/v1/user/user/getAllUser`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getAllUsersSuccess(res.data));
    } catch (error) {
        dispatch(getAllUsersFailed());
    }
};

export const addFriend = async (
    dispatch,
    axiosJWT,
    accessToken,
    senderId,
    receiverId
) => {
    dispatch(addFriendStart());
    try {
        await axiosJWT.post(
            `/v1/user/addFriend/${senderId}/${receiverId}`,
            receiverId,
            {
                headers: { token: `Bearer ${accessToken}` },
            }
        );
        dispatch(addFriendSuccess());
    } catch (error) {
        dispatch(addFriendFailed());
    }
};

export const createConversation = async (
    dispatch,
    axiosJWT,
    accessToken,
    info
) => {
    dispatch(conversationStart());
    try {
        const res = await axiosJWT.post(`/v1/conversation`, info, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(conversationSuccess(res.data));
    } catch (error) {
        dispatch(conversationFailed());
    }
};

export const getConversations = async (
    dispatch,
    axiosJWT,
    accessToken,
    userId
) => {
    dispatch(getConversationsStart());
    try {
        const res = await axiosJWT.get(`/v1/conversation/${userId}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getConversationsSuccess(res.data));
    } catch (error) {
        dispatch(getConversationsFailed());
    }
};
