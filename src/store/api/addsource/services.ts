import { apiAddSourceFetchStart, apiAddSourceFetchSuccess, apiAddSourceFetchError } from './dispatchers';
import { fetchAddSourceResult } from '../../../environments/services';
import { AddSourceResponse, AddSourceRequest } from '../../../models/api/addsource';
import { apiDatabaseFetch } from '../database/services';

// eslint-disable-next-line import/prefer-default-export
export const apiAddSourceFetch = (name: string, url: string) => (dispatch: Function): void => {
  dispatch(apiAddSourceFetchStart());

  const requestData: AddSourceRequest = {
    datasourceName: name,
    datasourceUrl: url,
  };

  if (!requestData) return;

  console.log(JSON.stringify(requestData));
  fetchAddSourceResult(requestData)
    .then((response: AddSourceResponse) => {
      if (response.success) {
        dispatch(apiAddSourceFetchSuccess(response.message));
        dispatch(apiDatabaseFetch());
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiAddSourceFetchError(error)));
};
