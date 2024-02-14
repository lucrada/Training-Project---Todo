/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from '../actions/actions';

async function loginAPI(email, password) {
    try {
        const userAuthSuccess = await auth().signInWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid, name: userAuthSuccess.user.displayName };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

async function registerAPI(email, password) {
    try {
        const userAuthSuccess = await auth().createUserWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid, name: userAuthSuccess.user.displayName };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

async function logoutAPI() {
    try {
        await auth().signOut();
        return { success: true };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

function* loginAsync(action) {
    const { email, password } = action.payload;
    const user = yield call(() => loginAPI(email, password));
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* registerAsync() {
    const user = yield call(registerAPI);
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* logoutAsync() {
    yield call(logoutAPI);
    yield put({ type: 'auth/logoutSuccess' });
}

function* logoutSaga() {
    yield takeEvery(USER_LOGOUT_REQUEST, logoutAsync);
}

function* registerSaga() {
    yield takeEvery(USER_REGISTER_REQUEST, registerAsync);
}

function* loginSaga() {
    yield takeEvery(USER_LOGIN_REQUEST, loginAsync);
}

export default function* mySaga() {
    yield all([loginSaga(), logoutSaga(), registerSaga()]);
}
