import { combineReducers } from 'redux';
import datasourceReducer from './api/database/reducers';

const rootReducer = combineReducers({
  datasourceData: datasourceReducer,
});

export default rootReducer;
