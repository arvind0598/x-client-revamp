import { ApiDatabaseAction } from './dispatchers';
import { DatabaseSliceType } from '../../../models/app/store';
import defaultStore from './default-store';

// eslint-disable-next-line max-len
const apiDatabaseReducer = (state: DatabaseSliceType = defaultStore, action: ApiDatabaseAction): DatabaseSliceType => {
  switch (action.type) {
    case 'API_DATABASE_FETCH_START': {
      return {
        ...state,
        datasourceLoadStatus: 'LOADING',
      };
    }
    case 'API_DATABASE_FETCH_SUCCESS': {
      const { data } = action;
      return {
        ...state,
        datasources: data,
        datasourceLoadStatus: 'SUCCESS',
        datasourceLoadMessage: 'Datasources fetched succesfully.',
      };
    }
    case 'API_DATABASE_FETCH_ERROR': {
      const { error } = action;
      return {
        ...state,
        datasourceLoadStatus: 'INIT',
        datasourceLoadMessage: error,
      };
    }
    case 'API_DATABASE_CHOOSE': {
      const { name } = action;
      return {
        ...state,
        activeSource: name,
      };
    }
    default: {
      return state;
    }
  }
};

export default apiDatabaseReducer;
