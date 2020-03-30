import { apiDatabaseFetchStart, apiDatabaseFetchSuccess, apiDatabaseFetchError } from './dispatchers';
import { fetchSources } from '../../../environments/services';
import { DatabasesResponse } from '../../../models/api/databases';

// eslint-disable-next-line import/prefer-default-export
export const apiDatabaseFetch = () => (dispatch: Function): void => {
  dispatch(apiDatabaseFetchStart());
  fetchSources()
    .then((response: DatabasesResponse) => {
      if (response.success) {
        dispatch(apiDatabaseFetchSuccess(response.data));
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiDatabaseFetchError(error)));
};
