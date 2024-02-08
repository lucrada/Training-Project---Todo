/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    selectedCategory: {
        id: 0,
        title: '',
    },
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories = [action.payload, ...state.categories];
        },
        selectCategory: (state, action) => {
            state.selectedCategory.id = action.payload;
            let category = state.categories.filter(item => item.id === action.payload)[0];
            state.selectedCategory.title = category.title;
        },
        incrementPendingTask: (state, action) => {
            state.categories.map(item => item.id === action.payload && item.pending++);
        },
        decrementPendingTask: (state, action) => {
            state.categories.map(item => item.id === action.payload && item.pending--);
        },
    },
});

export const { addCategory, selectCategory, incrementPendingTask, decrementPendingTask } = categorySlice.actions;
export default categorySlice.reducer;
