import { DatabasesResponse } from '../models/api/databases';
import * as routes from './routes';
import { Mode } from '../models/utils/utils';
import { EntitiesResponse } from '../models/api/entities';
import { FieldsResponse, FieldResponseModel } from '../models/api/fields';
import { RelationsResponse } from '../models/api/relations';
import { ApiRequest, ApiResponse } from '../models/api/response';

import baseResponse from './data/base-response.json';
import databases from './data/databases.json';
import relations from './data/relations.json';
import entities from './data/entities.json';
import fields from './data/fields.json';
import api from './data/api.json';

const currentMode: Mode = 'DEV';

const fetchData = (route: string): Promise<unknown> => (
  fetch(route).then((data) => data.json() as unknown)
);

const postData = (route: string, body: unknown): Promise<unknown> => (
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((data) => data.json() as unknown)
);

const resolveIfDev = (response: unknown): Promise<unknown> => new Promise(
  (resolve, reject) => {
    if (currentMode === 'DEV') {
      resolve(response);
    }
    else {
      reject(new Error('Is not in development mode.'));
    }
  },
);

export const fetchSources = (): Promise<DatabasesResponse> => (
  resolveIfDev(databases)
    .then((data) => data as DatabasesResponse)
    .catch(() => fetchData(routes.getDatasourceRoute()) as Promise<DatabasesResponse>)
);

export const fetchEntities = (datasource: string): Promise<EntitiesResponse> => (
  resolveIfDev(entities)
    .then((data) => data as EntitiesResponse)
    .catch(() => fetchData(routes.getEntitiesRoute(datasource)) as Promise<EntitiesResponse>)
);

export const fetchRelations = (datasource: string): Promise<RelationsResponse> => (
  resolveIfDev(relations)
    .then((data) => data as RelationsResponse)
    .catch(() => fetchData(routes.getRelationshipsRoute(datasource)) as Promise<RelationsResponse>)
);

const getFieldsForEntity = (entity: string): FieldResponseModel[] => (
  fields
    .filter((field) => (field.parent === entity))
    .map(({ name, type }): FieldResponseModel => ({
      name,
      type,
    }))
);

export const fetchFields = (entity: string): Promise<FieldsResponse> => (
  resolveIfDev(baseResponse)
    .then((response) => {
      const entityFields = getFieldsForEntity(entity);
      response.data = entityFields;
      return response as FieldsResponse;
    })
    .catch(() => fetchData(routes.getFieldsRoute(entity)) as Promise<FieldsResponse>)
);

export const fetchApiResult = (data: ApiRequest[]): Promise<ApiResponse> => (
  resolveIfDev(api)
    .then((response) => response as ApiResponse)
    .catch(() => postData(routes.getApiRoute(), data) as Promise<ApiResponse>)
);
