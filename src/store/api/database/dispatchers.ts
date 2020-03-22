import {
  API_DATABASE_FETCH_START,
  API_DATABASE_FETCH_SUCCESS,
  API_DATABASE_FETCH_ERROR,
  API_DATABASE_CHOOSE,
} from './types';
import { fetchSources } from '../../../environments/services';
import { DatabasesResponse } from '../../../models/api/databases';

type ApiDatabaseFetchStartAction = {
  type: typeof API_DATABASE_FETCH_START;
};
export const apiDatabaseFetchStart = (): ApiDatabaseFetchStartAction => ({
  type: API_DATABASE_FETCH_START,
});

type ApiDatabaseFetchSuccessAction = {
  type: typeof API_DATABASE_FETCH_SUCCESS;
  data: string[];
};
export const apiDatabaseFetchSuccess = (data: string[]): ApiDatabaseFetchSuccessAction => ({
  type: API_DATABASE_FETCH_SUCCESS,
  data,
});

type ApiDatabaseFetchErrorAction = {
  type: typeof API_DATABASE_FETCH_ERROR;
  error: string;
};
export const apiDatabaseFetchError = (error: string): ApiDatabaseFetchErrorAction => ({
  type: API_DATABASE_FETCH_ERROR,
  error,
});

type ApiDatabaseChooseAction = {
  type: typeof API_DATABASE_CHOOSE;
  name: string;
};
export const apiDatabaseChoose = (name: string): ApiDatabaseChooseAction => ({
  type: API_DATABASE_CHOOSE,
  name,
});


export const apiDatabaseFetch = () => (dispatch) => {
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

export type ApiDatabaseAction = ApiDatabaseFetchStartAction
| ApiDatabaseFetchSuccessAction
| ApiDatabaseFetchErrorAction
| ApiDatabaseChooseAction;
