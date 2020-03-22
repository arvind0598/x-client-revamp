import { applyMiddleware, createStore } from 'redux';
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

const rootStore = createStore(rootReducer, defaultStore, applyMiddleware(...middlewares));

export default rootStore;
