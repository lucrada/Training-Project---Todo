/* eslint-disable prettier/prettier */
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const UPDATE_AUTH_STATUS_REQUEST = 'UPDATE_AUTH_STATUS_REQUEST';
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST';
export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST';
export const INCREMENT_PENDING_TASK_REQUEST = 'INCREMENT_PENDING_TASK';
export const DECREMENT_PENDING_TASK_REQUEST = 'DECREMENT_PENDING_TASK';
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';

const getUserLoginRequest = (credentials) => {
    return { type: USER_LOGIN_REQUEST, payload: credentials };
};

const getUserLogoutRequest = () => {
    return { type: USER_LOGOUT_REQUEST };
};

const getUserRegisterRequest = (credentials) => {
    return { type: USER_REGISTER_REQUEST, payload: credentials };
};

const getUpdateAuthStatusRequest = () => {
    return { type: UPDATE_AUTH_STATUS_REQUEST };
};

const getAddCategoryRequest = (category) => {
    return { type: ADD_CATEGORY_REQUEST, payload: category };
};

const getAddTodoRequest = (todo) => {
    return { type: ADD_TODO_REQUEST, payload: todo };
};

const getRemoveTodoRequest = (id) => {
    return { type: REMOVE_TODO_REQUEST, payload: id };
};

const getToggleTodoRequest = (id) => {
    return { type: TOGGLE_TODO_REQUEST, payload: id };
};

const getIncrementRequest = (id) => {
    return { type: INCREMENT_PENDING_TASK_REQUEST, payload: id };
};

const getDecrementRequest = (id) => {
    return { type: DECREMENT_PENDING_TASK_REQUEST, payload: id };
};

const getFetchCategoriesRequest = () => {
    return { type: FETCH_CATEGORIES_REQUEST };
};

const getFetchTodosRequest = () => {
    return { type: FETCH_TODOS_REQUEST };
};

export {
    getUserLoginRequest,
    getUserLogoutRequest,
    getUserRegisterRequest,
    getUpdateAuthStatusRequest,
    getAddCategoryRequest,
    getAddTodoRequest,
    getRemoveTodoRequest,
    getToggleTodoRequest,
    getIncrementRequest,
    getDecrementRequest,
    getFetchCategoriesRequest,
    getFetchTodosRequest,
};
