/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import onCreateTriggerNotification from '../NotificationHandler';

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initTodos: (state, action) => {
            state.todos = action.payload;
        },
        resetTodos: (state) => {
            state.todos = [];
        },
        clearTodosWithCategory: (state, action) => {
            if (!action.payload.success) { return; }
            let catId = action.payload.id;
            state.todos = state.todos.filter(item => item.category_id !== catId);
        },
        addTodo: (state, action) => {
            if (action.payload.success) {
                state.todos = [action.payload.todo, ...state.todos];
                let requiredDate = new Date(action.payload.todo.date);
                let requiredTime = new Date(action.payload.todo.time);
                let finalDate = new Date(requiredDate.getFullYear(), requiredDate.getMonth(), requiredDate.getDate(), requiredTime.getHours(), requiredTime.getMinutes(), requiredTime.getSeconds());
                onCreateTriggerNotification(action.payload.todo.task, finalDate);
            }
        },
        deleteTodo: (state, action) => {
            if (action.payload.success) {
                state.todos = state.todos.filter(item => item.id !== action.payload.id);
            }
        },
        toggleStatus: (state, action) => {
            if (action.payload.success) {
                let index = state.todos.findIndex(item => item.id === action.payload.id);
                state.todos[index] = { ...state.todos[index], finished: !state.todos[index].finished };
            }
        },
    },
});

export const { addTodo, deleteTodo, toggleStatus, resetTodos } = todoSlice.actions;
export default todoSlice.reducer;
