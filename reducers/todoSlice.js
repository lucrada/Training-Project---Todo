/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import onCreateTriggerNotification, { cancelNotification } from '../NotificationHandler';

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initTodos: (state, action) => {
            state.todos = action.payload.reverse();
        },
        resetTodos: (state) => {
            state.todos = [];
        },
        clearTodosWithCategory: (state, action) => {
            if (!action.payload.success) { return; }
            let catId = action.payload.id;
            state.todos.forEach(item => item.category_id === catId && cancelNotification(item.id));
            state.todos = state.todos.filter(item => item.category_id !== catId);
        },
        addTodo: (state, action) => {
            if (action.payload.success) {
                state.todos = [action.payload.todo, ...state.todos];
                const requiredDate = new Date(action.payload.todo.date);
                const requiredTime = new Date(action.payload.todo.time);
                const finalDate = new Date(requiredDate.getFullYear(), requiredDate.getMonth(), requiredDate.getDate(), requiredTime.getHours(), requiredTime.getMinutes(), requiredTime.getSeconds());
                onCreateTriggerNotification(action.payload.todo.task, finalDate, action.payload.todo.id);
            }
        },
        deleteTodo: (state, action) => {
            if (action.payload.success) {
                state.todos = state.todos.filter(item => item.id !== action.payload.id);
                cancelNotification(action.payload.id);
            }
        },
        toggleStatus: (state, action) => {
            if (action.payload.success) {
                let index = state.todos.findIndex(item => item.id === action.payload.id);
                state.todos[index] = { ...state.todos[index], finished: !state.todos[index].finished };
                if (state.todos[index].finished) {
                    cancelNotification(state.todos[index].id);
                } else {
                    const requiredDate = new Date(state.todos[index].date);
                    const requiredTime = new Date(state.todos[index].time);
                    const finalDate = new Date(requiredDate.getFullYear(), requiredDate.getMonth(), requiredDate.getDate(), requiredTime.getHours(), requiredTime.getMinutes(), requiredTime.getSeconds());
                    onCreateTriggerNotification(state.todos[index].task, finalDate, state.todos[index].id);
                }
            }
        },
    },
});

export const { addTodo, deleteTodo, toggleStatus, resetTodos } = todoSlice.actions;
export default todoSlice.reducer;
