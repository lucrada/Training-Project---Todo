/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos = [action.payload, ...state.todos];
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        toggleStatus: (state, action) => {
            let index = state.todos.findIndex(item => item.id === action.payload);
            state.todos[index] = { ...state.todos[index], finished: !state.todos[index].finished };
        },
    },
});

export const { addTodo, deleteTodo, toggleStatus } = todoSlice.actions;
export default todoSlice;
