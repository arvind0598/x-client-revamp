import {
  API_RELATIONS_FETCH_START,
  API_RELATIONS_FETCH_SUCCESS,
  API_RELATIONS_FETCH_ERROR,
  RELATIONS_SETUP,
} from './types';
import { RelationsResponseModel } from '../../../models/api/relations';
import { API_ENTITIES_CLEAR } from '../entities/types';

type ApiRelationsFetchStartAction = {
  type: typeof API_RELATIONS_FETCH_START;
  source: string;
};
export const apiRelationsFetchStart = (
  source: string,
): ApiRelationsFetchStartAction => ({
  type: API_RELATIONS_FETCH_START,
  source,
});

type ApiRelationsFetchSuccessAction = {
  type: typeof API_RELATIONS_FETCH_SUCCESS;
  data: RelationsResponseModel[];
};
export const apiRelationsFetchSuccess = (
  data: RelationsResponseModel[],
): ApiRelationsFetchSuccessAction => ({
  type: API_RELATIONS_FETCH_SUCCESS,
  data,
});

type ApiRelationsFetchErrorAction = {
  type: typeof API_RELATIONS_FETCH_ERROR;
  error: string;
};
export const apiRelationsFetchError = (
  error: string,
): ApiRelationsFetchErrorAction => ({
  type: API_RELATIONS_FETCH_ERROR,
  error,
});

type RelationsSetupAction = {
  type: typeof RELATIONS_SETUP;
  entityName: string;
};
export const relationsSetup = (
  entityName: string,
): RelationsSetupAction => ({
  type: RELATIONS_SETUP,
  entityName,
});

type RelationsClearAction = {
  type: typeof API_ENTITIES_CLEAR;
};
export const relationsClear = (
): RelationsClearAction => ({
  type: API_ENTITIES_CLEAR,
});

export type ApiRelationsAction = ApiRelationsFetchStartAction
| ApiRelationsFetchSuccessAction
| ApiRelationsFetchErrorAction
| RelationsClearAction;

export type RelationsAction = RelationsSetupAction;
