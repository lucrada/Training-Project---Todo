/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { ADD_CATEGORY_REQUEST, ADD_TODO_REQUEST, DECREMENT_PENDING_TASK_REQUEST, DELETE_CATEGORY_REQUEST, FETCH_CATEGORIES_REQUEST, FETCH_TODOS_REQUEST, INCREMENT_PENDING_TASK_REQUEST, REMOVE_TODO_REQUEST, TOGGLE_TODO_REQUEST, UPDATE_AUTH_STATUS_REQUEST, USER_LOGIN_REQUEST, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST } from '../actions/actions';

const loginAPI = async (email, password) => {
    try {
        const userAuthSuccess = await auth().signInWithEmailAndPassword(email, password);
        return { success: true, userId: userAuthSuccess.user.uid, name: userAuthSuccess.user.displayName };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
};

const registerAPI = async (email, password, name) => {
    try {
        const userAuthSuccess = await auth().createUserWithEmailAndPassword(email, password);
        await userAuthSuccess.user.updateProfile({ displayName: name });
        return { success: true, userId: userAuthSuccess.user.uid, name: name };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
};

const logoutAPI = async () => {
    try {
        await auth().signOut();
        return { success: true };
    } catch (error) {
        return { success: false, errorrCode: error.code };
    }
};

function authStatusAPI() {
    try {
        const user = auth().currentUser;
        return { success: true, status: !!user, uid: user ? user.uid : '', name: user ? user.displayName : '' };
    } catch (error) {
        return { success: false, errorCode: error.code };
    }
}

const storeData = async (collection, data) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const documentRef = await firestore().collection(collection).doc(uid).collection('data').add(data);
            return { success: true, id: documentRef.id };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const deleteTodo = async (documentId) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            await firestore().collection('todos').doc(uid).collection('data').doc(documentId).delete();
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const toggleTodo = async (documentId) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const documentRef = firestore().collection('todos').doc(uid).collection('data').doc(documentId);
            const docSnapshot = await documentRef.get();

            const currentFinishedStatus = docSnapshot.data().finished || false;
            const updatedFinishedStatus = !currentFinishedStatus;

            await documentRef.update({ finished: updatedFinishedStatus });

            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const changePending = async (documentId, incr = true) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const documentRef = firestore().collection('categories').doc(uid).collection('data').doc(documentId);
            const docSnapshot = await documentRef.get();

            const currentPendingNumber = parseInt(docSnapshot.data().pending, 10);
            const updatedPendingNumber = incr ? currentPendingNumber + 1 : currentPendingNumber - 1;

            await documentRef.update({ pending: updatedPendingNumber });

            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const fetchCollection = async (collection) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            const querySnapshot = await firestore().collection(collection).doc(uid).collection('data').get();

            const documents = [];
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
            }

            return { success: true, payload: documents };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};

const deleteCategory = async (catId) => {
    const user = auth().currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
        try {
            await firestore().collection('categories').doc(uid).collection('data').doc(catId).delete();
            const todosRef = firestore().collection('todos').doc(uid).collection('data');
            const query = todosRef.where('category_id', '==', catId);
            const querySnapshot = await query.get();
            const batch = firestore().batch();
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            return { success: true };
        } catch (error) {
            return { success: false };
        }
    } else {
        return { success: false };
    }
};



function* deleteCategoryAsync(action) {
    const catId = action.payload;
    const result = yield call(() => deleteCategory(catId));
    yield put({ type: 'category/deleteCategory', payload: { success: result.success, id: result.success ? catId : null } });
    yield put({ type: 'todos/clearTodosWithCategory', payload: { success: result.success, id: result.success ? catId : null } });
}

function* fetchCategoryAsync() {
    const result = yield call(() => fetchCollection('categories'));
    yield put({ type: 'category/initCategories', payload: result.success ? result.payload : [] });
}

function* fetchTodoAsync() {
    const result = yield call(() => fetchCollection('todos'));
    const todosWithSerializableTimeAndDate = result.payload.map(todo => ({
        ...todo,
        time: todo.time ? todo.time.toDate().toISOString() : null,
        date: todo.date ? todo.date.toDate().toISOString() : null,
    }));
    yield put({ type: 'todos/initTodos', payload: result.success ? todosWithSerializableTimeAndDate : [] });
}

function* addCategoryAsync(action) {
    const category = action.payload;
    const result = yield call(() => storeData('categories', category));
    yield put({ type: 'category/addCategory', payload: { success: result.success, category: result.success ? { ...category, id: result.id } : null } });
}

function* incrementPendingAsync(action) {
    const id = action.payload;
    const result = yield call(() => changePending(id));
    yield put({ type: 'category/incrementPendingTask', payload: { success: result.success, id: result.success ? id : null } });

}

function* decrementPendingAsync(action) {
    const id = action.payload;
    const result = yield call(() => changePending(id, false));
    yield put({ type: 'category/decrementPendingTask', payload: { success: result.success, id: result.success ? id : null } });
}

function* toggleTodoAsync(action) {
    const id = action.payload;
    const result = yield call(() => toggleTodo(id));
    yield put({ type: 'todos/toggleStatus', payload: { success: result.success, id: result.success ? id : null } });
}

function* removeTodoAsync(action) {
    const id = action.payload;
    const result = yield call(() => deleteTodo(id));
    yield put({ type: 'todos/deleteTodo', payload: { success: result.success, id: result.success ? id : null } });
}

function* addTodoAsync(action) {
    const todo = action.payload;
    const result = yield call(() => storeData('todos', todo));
    yield put({ type: 'todos/addTodo', payload: { success: result.success, todo: result.success ? { ...todo, id: result.id } : null } });
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

function* addCategorySaga() {
    yield takeEvery(ADD_CATEGORY_REQUEST, addCategoryAsync);
}

function* addTodoSaga() {
    yield takeEvery(ADD_TODO_REQUEST, addTodoAsync);
}

function* removeTodoSaga() {
    yield takeEvery(REMOVE_TODO_REQUEST, removeTodoAsync);
}

function* toggleTodoSaga() {
    yield takeEvery(TOGGLE_TODO_REQUEST, toggleTodoAsync);
}

function* incrementPendingSaga() {
    yield takeEvery(INCREMENT_PENDING_TASK_REQUEST, incrementPendingAsync);
}

function* decrementPendingSaga() {
    yield takeEvery(DECREMENT_PENDING_TASK_REQUEST, decrementPendingAsync);
}

function* fetchCategorySaga() {
    yield takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoryAsync);
}

function* fetchTodosSaga() {
    yield takeEvery(FETCH_TODOS_REQUEST, fetchTodoAsync);
}

function* deleteCategorySaga() {
    yield takeEvery(DELETE_CATEGORY_REQUEST, deleteCategoryAsync);
}

export default function* mySaga() {
    yield all([
        loginSaga(),
        logoutSaga(),
        registerSaga(),
        authStatusSaga(),
        addCategorySaga(),
        addTodoSaga(),
        removeTodoSaga(),
        toggleTodoSaga(),
        incrementPendingSaga(),
        decrementPendingSaga(),
        fetchCategorySaga(),
        fetchTodosSaga(),
        deleteCategorySaga(),
    ]);
}
