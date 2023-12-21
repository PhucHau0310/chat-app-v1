import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversation: {
            info: null,
            isLoading: false,
            error: false,
        },
        getConversations: {
            infos: null,
            isLoading: false,
            error: false,
        },
    },
    reducers: {
        conversationStart: (state) => {
            state.conversation.isLoading = true;
        },
        conversationSuccess: (state, action) => {
            state.conversation.info = action.payload;
            state.conversation.isLoading = false;
            state.conversation.error = false;
        },
        conversationFailed: (state) => {
            state.conversation.isLoading = false;
            state.conversation.error = true;
        },
        getConversationsStart: (state) => {
            state.getConversations.isLoading = true;
        },
        getConversationsSuccess: (state, action) => {
            state.getConversations.infos = action.payload;
            state.getConversations.isLoading = false;
            state.getConversations.error = false;
        },
        getConversationsFailed: (state) => {
            state.getConversations.isLoading = false;
            state.getConversations.error = true;
        },
    },
});

export const {
    conversationStart,
    conversationSuccess,
    conversationFailed,
    getConversationsStart,
    getConversationsSuccess,
    getConversationsFailed,
} = conversationSlice.actions;
export default conversationSlice.reducer;
