/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    name: '',
    errorCode: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSuccess: (state, action) => {
            if (action.payload.success) {
                return { errorCode: '', userId: action.payload.userId, name: action.payload.name };
            }
            return { ...state, errorCode: action.payload.errorCode };
        },
        updateStatus: (state, action) => {
            if (action.payload.success) {
                if (action.payload.status) {
                    return { errorCode: '', userId: action.payload.uid, name: action.payload.name };
                }
                return { errorCode: '', userId: '', name: '' };
            }
            return { ...state, errorCode: action.payload.errorCode };
        },
        logoutSuccess: (state, action) => {
            if (action.payload.success) {
                return { errorCode: '', userId: '', name: '' };
            }
            return { ...state, errorCode: action.payload.errorCode };
        },
    },
});

export const { authSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
