/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import todoReducer from './todoSlice';

const rootReducers = combineReducers({
    category: categoryReducer,
    todo: todoReducer,
});

export default rootReducers;
