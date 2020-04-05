import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import datasourceReducer from './api/database/reducers';
import apiEntitiesReducer from './api/entities/reducers';
import apiFieldsReducer from './api/fields/reducers';
import { dragEntitiesReducer } from './drag/basic/reducers';
import { apiRelationsReducer, relationsReducer } from './api/relations/reducers';
import { modalReducer, fieldsReducer } from './modal/reducers';
import { nestedDragEntitiesReducer } from './drag/nested/reducers';

const rootReducer = combineReducers({
  datasourceData: datasourceReducer,
  entitiesData: reduceReducers(apiEntitiesReducer, dragEntitiesReducer, nestedDragEntitiesReducer),
  fieldsData: reduceReducers(apiFieldsReducer, fieldsReducer),
  relationsData: apiRelationsReducer,
  modalData: modalReducer,
});

const reducedRootReducer = reduceReducers(rootReducer, relationsReducer);

export default reducedRootReducer;
