import {
  API_RESPONSE_FETCH_START,
  API_RESPONSE_FETCH_SUCCESS,
  API_RESPONSE_FETCH_ERROR,
} from './types';

type ApiResponseFetchStartAction = {
  type: typeof API_RESPONSE_FETCH_START;
};
export const apiResponseFetchStart = (
): ApiResponseFetchStartAction => ({
  type: API_RESPONSE_FETCH_START,
});

type ApiResponseFetchSuccessAction = {
  type: typeof API_RESPONSE_FETCH_SUCCESS;
  uuid: string;
};
export const apiResponseFetchSuccess = (
  uuid: string,
): ApiResponseFetchSuccessAction => ({
  type: API_RESPONSE_FETCH_SUCCESS,
  uuid,
});

type ApiResponseFetchErrorAction = {
  type: typeof API_RESPONSE_FETCH_ERROR;
  error: string;
};
export const apiResponseFetchError = (
  error: string,
): ApiResponseFetchErrorAction => ({
  type: API_RESPONSE_FETCH_ERROR,
  error,
});

export type ApiResponseFetchAction = ApiResponseFetchStartAction
| ApiResponseFetchSuccessAction
| ApiResponseFetchErrorAction;
