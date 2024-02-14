/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    name: '',
    errorMessage: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSuccess: (state, action) => {
            if (!action.payload) { return state; }
            console.log(action.payload);
            return state;
            // return { userId: action.payload.userId, name: action.payload.name };
        },
        logoutSuccess: (state, action) => {
            return { ...state, userId: '', name: '' };
        },
    },
});

export const { authSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
