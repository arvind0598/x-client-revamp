import {
  apiRelationsFetchStart,
  apiRelationsFetchSuccess,
  apiRelationsFetchError,
} from './dispatchers';
import { fetchRelations } from '../../../environments/services';
import { RelationsResponse } from '../../../models/api/relations';

// eslint-disable-next-line import/prefer-default-export
export const apiRelationsFetch = (source: string) => (dispatch: Function): void => {
  dispatch(apiRelationsFetchStart(source));
  fetchRelations(source)
    .then((response: RelationsResponse) => {
      if (response.success) {
        dispatch(apiRelationsFetchSuccess(response.data));
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiRelationsFetchError(error)));
};
