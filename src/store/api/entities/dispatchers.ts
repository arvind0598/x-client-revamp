import {
  API_ENTITIES_FETCH_START,
  API_ENTITIES_FETCH_SUCCESS,
  API_ENTITIES_FETCH_ERROR,
  API_ENTITIES_CLEAR,
} from './types';
import { fetchEntities } from '../../../environments/services';
import { EntitiesResponse } from '../../../models/api/entities';
import { apiDatabaseChoose } from '../database/dispatchers';

type ApiEntitiesFetchStartAction = {
  type: typeof API_ENTITIES_FETCH_START;
};
export const apiEntitiesFetchStart = (): ApiEntitiesFetchStartAction => ({
  type: API_ENTITIES_FETCH_START,
});

type ApiEntitiesFetchSuccessAction = {
  type: typeof API_ENTITIES_FETCH_SUCCESS;
  data: string[];
};
export const apiEntitiesFetchSuccess = (data: string[]): ApiEntitiesFetchSuccessAction => ({
  type: API_ENTITIES_FETCH_SUCCESS,
  data,
});

type ApiEntitiesFetchErrorAction = {
  type: typeof API_ENTITIES_FETCH_ERROR;
  error: string;
};
export const apiEntitiesFetchError = (error: string): ApiEntitiesFetchErrorAction => ({
  type: API_ENTITIES_FETCH_ERROR,
  error,
});

type ApiEntitiesClearAction = {
  type: typeof API_ENTITIES_CLEAR;
};
export const apiEntitiesClear = (): ApiEntitiesClearAction => ({
  type: API_ENTITIES_CLEAR,
});

export const apiEntitiesFetchAfterChoose = (source: string) => (dispatch: Function): void => {
  dispatch(apiDatabaseChoose(source));
  dispatch(apiEntitiesClear());
  dispatch(apiEntitiesFetchStart());
  fetchEntities(source)
    .then((response: EntitiesResponse) => {
      if (response.success) {
        dispatch(apiEntitiesFetchSuccess(response.data));
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiEntitiesFetchError(error)));
};

export type ApiEntitiesAction = ApiEntitiesFetchStartAction
| ApiEntitiesFetchSuccessAction
| ApiEntitiesFetchErrorAction
| ApiEntitiesClearAction;
