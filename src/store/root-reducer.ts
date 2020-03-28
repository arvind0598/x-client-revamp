import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import datasourceReducer from './api/database/reducers';
import apiEntitiesReducer from './api/entities/reducers';
import apiFieldsReducer from './api/fields/reducers';
import { dragEntitiesReducer } from './drag/reducers';
import { apiRelationsReducer } from './api/relations/reducers';

const rootReducer = combineReducers({
  datasourceData: datasourceReducer,
  entitiesData: reduceReducers(apiEntitiesReducer, dragEntitiesReducer),
  fieldsData: apiFieldsReducer,
  relationsData: apiRelationsReducer,
});

export default rootReducer;
