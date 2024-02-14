/* eslint-disable prettier/prettier */
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';

const getUserLoginRequest = (credentials) => {
    return { type: USER_LOGIN_REQUEST, payload: credentials };
};

const getUserLogoutRequest = () => {
    return { type: USER_LOGOUT_REQUEST };
};

const getUserRegisterRequest = (credentials) => {
    return { type: USER_REGISTER_REQUEST, payload: credentials };
};

export { getUserLoginRequest, getUserLogoutRequest, getUserRegisterRequest };
