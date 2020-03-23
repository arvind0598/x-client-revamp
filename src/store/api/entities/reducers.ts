import { EntitiesSliceType } from '../../../models/app/store';
import defaultStore from './default-store';
import { ApiEntitiesAction } from './dispatchers';

// eslint-disable-next-line max-len
const apiEntitiesReducer = (state: EntitiesSliceType = defaultStore, action: ApiEntitiesAction): EntitiesSliceType => {
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

export default apiEntitiesReducer;
