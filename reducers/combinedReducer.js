/* eslint-disable prettier/prettier */
import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import todoReducer from './todoSlice';
import authSlice from './authSlice';

const rootReducers = combineReducers({
    category: categoryReducer,
    todo: todoReducer,
    auth: authSlice,
});

export default rootReducers;
