import reduceReducers from 'reduce-reducers';
import { EntitiesSliceType, EntityType } from '../../../models/app/entities';
import defaultStore from './default-store';
import { ApiEntitiesAction } from './dispatchers';
import { ApiFieldsAction } from '../fields/dispatchers';
import { getChildrenFromFields } from '../../../utils/conversions';

// eslint-disable-next-line max-len
export const apiEntitiesReducer = (state: EntitiesSliceType = defaultStore, action: ApiEntitiesAction): EntitiesSliceType => {
  switch (action.type) {
    case 'API_ENTITIES_FETCH_START': {
      return {
        ...state,
        entitiesLoadStatus: 'LOADING',
      };
    }
    case 'API_ENTITIES_FETCH_SUCCESS': {
      const { data } = action;
      return {
        ...state,
        entities: data,
        entitiesLoadStatus: 'SUCCESS',
        entitiesLoadMessage: 'Entities fetched succesfully.',
      };
    }
    case 'API_ENTITIES_FETCH_ERROR': {
      const { error } = action;
      return {
        ...state,
        entitiesLoadMessage: error,
      };
    }
    case 'API_ENTITIES_CLEAR': {
      return defaultStore;
    }
    default: {
      return state;
    }
  }
};

const findEntityIndexByName = (entities: EntityType[], entityName: string): number => (
  entities.findIndex((entity) => (entity.name === entityName))
);

// eslint-disable-next-line max-len
export const apiFieldsEntityReducer = (state: EntitiesSliceType = defaultStore, action: ApiFieldsAction): EntitiesSliceType => {
  switch (action.type) {
    case 'API_FIELDS_FETCH_START': {
      const newEntities = [...state.entities];
      const entityIndex = findEntityIndexByName(newEntities, action.entityName);
      if (entityIndex < 0) return state;

      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        fieldsLoadStatus: 'LOADING',
        fieldsLoadMessage: `Loading fields for ${action.entityName}`,
      };
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'API_FIELDS_FETCH_SUCCESS': {
      const newEntities = [...state.entities];
      const entityIndex = findEntityIndexByName(newEntities, action.entityName);
      if (entityIndex < 0) return state;

      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        children: getChildrenFromFields(action.entityName, action.data),
        fieldsLoadStatus: 'SUCCESS',
        fieldsLoadMessage: `Loaded fields for ${action.entityName}`,
      };
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'API_FIELDS_FETCH_ERROR': {
      const newEntities = [...state.entities];
      const entityIndex = findEntityIndexByName(newEntities, action.entityName);
      if (entityIndex < 0) return state;

      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        fieldsLoadStatus: 'INIT',
        fieldsLoadMessage: `Could not load fields for ${action.entityName}`,
      };
      return {
        ...state,
        entities: newEntities,
      };
    }
    default: {
      return state;
    }
  }
};

export default reduceReducers(defaultStore, apiEntitiesReducer, apiFieldsEntityReducer);
