/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from '../reducers/combinedReducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export default store;
