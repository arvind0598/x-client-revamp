import { API_FIELDS_FETCH_START, API_FIELDS_FETCH_SUCCESS, API_FIELDS_FETCH_ERROR } from './types';
import { FieldType } from '../../../models/app/fields';

type ApiFieldsFetchStartAction = {
  type: typeof API_FIELDS_FETCH_START;
  entityName: string;
};
export const apiFieldsFetchStart = (entityName: string): ApiFieldsFetchStartAction => ({
  type: API_FIELDS_FETCH_START,
  entityName,
});

type ApiFieldsFetchSuccessAction = {
  type: typeof API_FIELDS_FETCH_SUCCESS;
  entityName: string;
  data: FieldType[];
}
// eslint-disable-next-line max-len
export const apiFieldsFetchSuccess = (entityName: string, data: FieldType[]): ApiFieldsFetchSuccessAction => ({
  type: API_FIELDS_FETCH_SUCCESS,
  entityName,
  data,
});

type ApiFieldsFetchErrorAction = {
  type: typeof API_FIELDS_FETCH_ERROR;
  entityName: string;
  error: string;
};
// eslint-disable-next-line max-len
export const apiFieldsFetchError = (entityName: string, error: string): ApiFieldsFetchErrorAction => ({
  type: API_FIELDS_FETCH_ERROR,
  entityName,
  error,
});

export type ApiFieldsAction = ApiFieldsFetchStartAction
| ApiFieldsFetchSuccessAction
| ApiFieldsFetchErrorAction;
