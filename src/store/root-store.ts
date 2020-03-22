import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import { StoreType } from '../models/app/store';
import apiStore from './api/default-store';

const defaultStore: StoreType = {
  datasourceData: apiStore.datasourceData,
};

const middlewares = [
  thunk,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootStore = createStore(rootReducer, defaultStore, composeEnhancers(
  applyMiddleware(...middlewares),
));

export default rootStore;
