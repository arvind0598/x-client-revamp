const BASE_URL = 'http://localhost:8081';

export const getDatasourceRoute = (): string => (
  `${BASE_URL}/sources`
);

export const getEntitiesRoute = (datasource: string): string => (
  `${BASE_URL}/${datasource}/tables`
);

export const getFieldsRoute = (entity: string): string => (
  `${BASE_URL}/tables/${entity}`
);

export const getRelationshipsRoute = (datasource: string): string => (
  `${BASE_URL}/${datasource}/relations`
);

export const getNewDbRoute = (): string => (
  `${BASE_URL}/addsource`
);

export const getApiRoute = (): string => (
  `${BASE_URL}/generate`
);

export const getCreatedRoute = (uuid: string): string => (
  `${BASE_URL}/api/${uuid}`
);
