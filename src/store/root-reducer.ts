import { combineReducers } from 'redux';
import datasourceReducer from './api/database/reducers';
import apiEntitiesReducer from './api/entities/reducers';

const rootReducer = combineReducers({
  datasourceData: datasourceReducer,
  entitiesData: apiEntitiesReducer,
});

export default rootReducer;
