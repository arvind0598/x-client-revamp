import { FieldsSliceType } from '../../../models/app/fields';
import defaultStore from './default-store';
import { ApiFieldsAction } from './dispatchers';

const apiFieldsReducer = (
  state: FieldsSliceType = defaultStore,
  action: ApiFieldsAction,
): FieldsSliceType => {
  switch (action.type) {
    case 'API_FIELDS_FETCH_START': {
      return state;
    }
    case 'API_FIELDS_FETCH_SUCCESS': {
      const { data } = action;
      return {
        ...state,
        fields: [
          ...state.fields,
          ...data,
        ],
      };
    }
    case 'API_FIELDS_FETCH_ERROR': {
      return state;
    }
    case 'API_ENTITIES_CLEAR': {
      return defaultStore;
    }
    default: {
      return state;
    }
  }
};

export default apiFieldsReducer;
