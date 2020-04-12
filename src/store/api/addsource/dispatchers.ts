import {
  API_ADD_SOURCE_FETCH_START,
  API_ADD_SOURCE_FETCH_SUCCESS,
  API_ADD_SOURCE_FETCH_ERROR,
} from './types';

type ApiAddSourceFetchStartAction = {
  type: typeof API_ADD_SOURCE_FETCH_START;
};
export const apiAddSourceFetchStart = (
): ApiAddSourceFetchStartAction => ({
  type: API_ADD_SOURCE_FETCH_START,
});

type ApiAddSourceFetchSuccessAction = {
  type: typeof API_ADD_SOURCE_FETCH_SUCCESS;
  message: string;
};
export const apiAddSourceFetchSuccess = (
  message: string,
): ApiAddSourceFetchSuccessAction => ({
  type: API_ADD_SOURCE_FETCH_SUCCESS,
  message,
});

type ApiAddSourceFetchErrorAction = {
  type: typeof API_ADD_SOURCE_FETCH_ERROR;
  message: string;
};
export const apiAddSourceFetchError = (
  message: string,
): ApiAddSourceFetchErrorAction => ({
  type: API_ADD_SOURCE_FETCH_ERROR,
  message,
});

export type ApiAddSourceFetchAction = ApiAddSourceFetchStartAction
| ApiAddSourceFetchSuccessAction
| ApiAddSourceFetchErrorAction;
