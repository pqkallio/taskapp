import { initialState } from './initialState';
import { rootReducer } from '../reducers';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const saga = createSagaMiddleware();

export const store = createStore(
  rootReducer(initialState),
  applyMiddleware(saga),
);

saga.run(rootSaga);
