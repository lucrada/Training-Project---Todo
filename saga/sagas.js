/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { UPDATE_AUTH_STATUS_REQUEST, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from '../actions/actions';

async function loginAPI(email, password) {
    try {
        const userAuthSuccess = await auth().signInWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid, name: userAuthSuccess.user.displayName };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

async function registerAPI(email, password, name) {
    try {
        const userAuthSuccess = await auth().createUserWithEmailAndPassword(email, password);
        await userAuthSuccess.user.updateProfile({ displayName: name });
        return { success: true, userId: userAuthSuccess.user.uid, name: name };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

async function logoutAPI() {
    try {
        await auth().signOut();
        return { success: true };
    } catch (error) {
        return { success: false, errorrCode: error.code };
    }
}

async function authStatusAPI() {
    try {
        const user = auth().currentUser;
        return { success: true, status: !!user, uid: user ? user.uid : '', name: user ? user.displayName : '' };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

function* loginAsync(action) {
    const { email, password } = action.payload;
    const user = yield call(() => loginAPI(email, password));
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* registerAsync(action) {
    const { email, password, name } = action.payload;
    const user = yield call(() => registerAPI(email, password, name));
    yield put({ type: 'auth/authSuccess', payload: user });
}

function* logoutAsync() {
    const status = yield call(logoutAPI);
    yield put({ type: 'auth/logoutSuccess', payload: status });
}

function* updateStatusAsync() {
    const status = yield call(authStatusAPI);
    yield put({ type: 'auth/updateStatus', payload: status });
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

function* authStatusSaga() {
    yield takeEvery(UPDATE_AUTH_STATUS_REQUEST, updateStatusAsync);
}

export default function* mySaga() {
    yield all([loginSaga(), logoutSaga(), registerSaga(), authStatusSaga()]);
}
