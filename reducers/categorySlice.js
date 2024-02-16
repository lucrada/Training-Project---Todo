/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

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
        initCategories: (state, action) => {
            state.categories = action.payload;
            if (state.categories.length > 0) {
                state.selectedCategory.id = state.categories[0].id;
                state.selectedCategory.title = state.categories[0].title;
            }
        },
        resetCategories: (state) => {
            state.categories = [];
            state.selectedCategory.id = 0;
            state.selectedCategory.title = '';
        },
        addCategory: (state, action) => {
            if (action.payload.success) {
                state.categories = [action.payload.category, ...state.categories];
                state.selectedCategory = { id: action.payload.category.id, title: action.payload.category.title };
            }
        },
        deleteCategory: (state, action) => {
            if (!action.payload.success) { return; }
            let catId = action.payload.id;
            state.categories = state.categories.filter(item => item.id !== catId);
            if (state.categories.length === 0) {
                state.categories = [];
                state.selectedCategory.id = 0;
                state.selectedCategory.title = '';
                return;
            }
            if (state.selectedCategory.id === catId) {
                state.selectedCategory.id = state.categories[0].id;
                state.selectedCategory.title = state.categories[0].title;
            }
        },
        selectCategory: (state, action) => {
            state.selectedCategory.id = action.payload;
            let category = state.categories.filter(item => item.id === action.payload)[0];
            state.selectedCategory.title = category.title;
        },
        incrementPendingTask: (state, action) => {
            if (action.payload.success) {
                state.categories.map(item => item.id === action.payload.id && item.pending++);
            }
        },
        decrementPendingTask: (state, action) => {
            if (action.payload.success) {
                state.categories.map(item => item.id === action.payload.id && item.pending--);
            }
        },
    },
});

export const { initCategories, addCategory, selectCategory, incrementPendingTask, decrementPendingTask, resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
