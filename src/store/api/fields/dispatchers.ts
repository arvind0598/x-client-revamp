import { API_FIELDS_FETCH_START, API_FIELDS_FETCH_SUCCESS, API_FIELDS_FETCH_ERROR } from './types';
import { FieldType } from '../../../models/app/fields';
import { API_ENTITIES_CLEAR } from '../entities/types';

type ApiFieldsFetchStartAction = {
  type: typeof API_FIELDS_FETCH_START;
  entityName: string;
};
export const apiFieldsFetchStart = (
  entityName: string,
): ApiFieldsFetchStartAction => ({
  type: API_FIELDS_FETCH_START,
  entityName,
});

type ApiFieldsFetchSuccessAction = {
  type: typeof API_FIELDS_FETCH_SUCCESS;
  entityName: string;
  data: FieldType[];
}
export const apiFieldsFetchSuccess = (
  entityName: string,
  data: FieldType[],
): ApiFieldsFetchSuccessAction => ({
  type: API_FIELDS_FETCH_SUCCESS,
  entityName,
  data,
});

type ApiFieldsFetchErrorAction = {
  type: typeof API_FIELDS_FETCH_ERROR;
  entityName: string;
  error: string;
};
export const apiFieldsFetchError = (
  entityName: string,
  error: string,
): ApiFieldsFetchErrorAction => ({
  type: API_FIELDS_FETCH_ERROR,
  entityName,
  error,
});

type ApiFieldsClearAction = {
  type: typeof API_ENTITIES_CLEAR;
};
export const apiFieldsClear = (
): ApiFieldsClearAction => ({
  type: API_ENTITIES_CLEAR,
});

export type ApiFieldsAction = ApiFieldsFetchStartAction
| ApiFieldsFetchSuccessAction
| ApiFieldsFetchErrorAction
| ApiFieldsClearAction;
