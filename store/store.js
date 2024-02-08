/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/combinedReducer";

const store = configureStore({
    reducer: rootReducers,
});

export default store;
