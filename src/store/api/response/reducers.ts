import { ModalSliceType } from '../../../models/app/modal';
import { ApiResponseFetchAction } from './dispatchers';
import { getCreatedRoute } from '../../../environments/routes';

// eslint-disable-next-line import/prefer-default-export
export const apiResponseReducer = (
  state: ModalSliceType,
  action: ApiResponseFetchAction,
): ModalSliceType => {
  switch (action.type) {
    case 'API_RESPONSE_FETCH_START': {
      return {
        ...state,
        status: 'LOADING',
      };
    }
    case 'API_RESPONSE_FETCH_SUCCESS': {
      const url = getCreatedRoute(action.uuid);
      return {
        ...state,
        status: 'SUCCESS',
        response: url,
      };
    }
    case 'API_RESPONSE_FETCH_ERROR': {
      return {
        ...state,
        status: 'INIT',
        response: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
