import { ModalSliceType } from '../../../models/app/modal';
import { ApiAddSourceFetchAction } from './dispatchers';

// eslint-disable-next-line import/prefer-default-export
export const apiAddSourceReducer = (
  state: ModalSliceType,
  action: ApiAddSourceFetchAction,
): ModalSliceType => {
  switch (action.type) {
    case 'API_ADD_SOURCE_FETCH_START': {
      return {
        ...state,
        status: 'LOADING',
      };
    }
    case 'API_ADD_SOURCE_FETCH_SUCCESS': {
      return {
        ...state,
        status: 'SUCCESS',
        response: action.message,
      };
    }
    case 'API_ADD_SOURCE_FETCH_ERROR': {
      return {
        ...state,
        status: 'INIT',
        response: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
