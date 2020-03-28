import { RelationsSliceType, StoreType } from '../../../models/app/store';
import defaultStore from './default-store';
import { ApiRelationsAction, RelationsAction } from './dispatchers';
import { selectEntities, selectEntityIndexByName } from '../../../selectors/entities';
import { selectArrayRelatedEntitiesByName, selectObjectRelatedEntitiesByName } from '../../../selectors/relations';
import { getChildrenFromRelatedEntities } from '../../../utils/conversions';

export const apiRelationsReducer = (
  state: RelationsSliceType = defaultStore,
  action: ApiRelationsAction,
): RelationsSliceType => {
  switch (action.type) {
    case 'API_RELATIONS_FETCH_START': {
      return {
        ...state,
        relationsLoadStatus: 'LOADING',
        relationsLoadMessage: 'Loading relations from datasource.',
      };
    }
    case 'API_RELATIONS_FETCH_SUCCESS': {
      const { data: relations } = action;
      return {
        relations,
        relationsLoadStatus: 'SUCCESS',
        relationsLoadMessage: 'Loaded relations from datasource.',
      };
    }
    case 'API_RELATIONS_FETCH_ERROR': {
      const { error } = action;
      return {
        ...state,
        relationsLoadStatus: 'INIT',
        relationsLoadMessage: error,
      };
    }
    default: {
      return state;
    }
  }
};

export const relationsReducer = (
  state: StoreType,
  action: RelationsAction,
): StoreType => {
  switch (action.type) {
    case 'API_RELATIONS_SETUP': {
      const { entityName } = action;
      const newEntities = selectEntities(state);
      const entityIndex = selectEntityIndexByName(state, entityName);
      const currentDrop = newEntities[entityIndex].allowDrop;

      const arrayEntities = selectArrayRelatedEntitiesByName(state, entityName);
      const arrayChildren = getChildrenFromRelatedEntities(arrayEntities, entityName);
      const objectEntities = selectObjectRelatedEntitiesByName(state, entityName);
      const objectChildren = getChildrenFromRelatedEntities(objectEntities, entityName);
      newEntities[entityIndex].allowDrop = [...currentDrop, ...arrayChildren, ...objectChildren];

      return {
        ...state,
        entitiesData: {
          ...state.entitiesData,
          entities: newEntities,
        },
      };
    }
    default: {
      return state;
    }
  }
};
