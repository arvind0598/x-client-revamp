import {
  API_ENTITIES_FETCH_START,
  API_ENTITIES_FETCH_SUCCESS,
  API_ENTITIES_FETCH_ERROR,
  API_ENTITIES_CLEAR,
} from './types';
import { EntityType } from '../../../models/app/entities';

type ApiEntitiesFetchStartAction = {
  type: typeof API_ENTITIES_FETCH_START;
};
export const apiEntitiesFetchStart = (
): ApiEntitiesFetchStartAction => ({
  type: API_ENTITIES_FETCH_START,
});

type ApiEntitiesFetchSuccessAction = {
  type: typeof API_ENTITIES_FETCH_SUCCESS;
  data: EntityType[];
};
export const apiEntitiesFetchSuccess = (
  data: EntityType[],
): ApiEntitiesFetchSuccessAction => ({
  type: API_ENTITIES_FETCH_SUCCESS,
  data,
});

type ApiEntitiesFetchErrorAction = {
  type: typeof API_ENTITIES_FETCH_ERROR;
  error: string;
};
export const apiEntitiesFetchError = (
  error: string,
): ApiEntitiesFetchErrorAction => ({
  type: API_ENTITIES_FETCH_ERROR,
  error,
});

type ApiEntitiesClearAction = {
  type: typeof API_ENTITIES_CLEAR;
};
export const apiEntitiesClear = (
): ApiEntitiesClearAction => ({
  type: API_ENTITIES_CLEAR,
});

export type ApiEntitiesAction = ApiEntitiesFetchStartAction
| ApiEntitiesFetchSuccessAction
| ApiEntitiesFetchErrorAction
| ApiEntitiesClearAction;
