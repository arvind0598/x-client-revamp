const BASE_URL = 'http://localhost:8081';

export const getDatasourceRoute = () => (
  `${BASE_URL}/sources`
);

export const getEntitiesRoute = (datasource: string) => (
  `${BASE_URL}/${datasource}/tables`
);

export const getFieldsRoute = (entity: string) => (
  `${BASE_URL}/tables/${entity}`
);

export const getRelationshipsRoute = (datasource: string) => (
  `${BASE_URL}/${datasource}/relations`
);

export const getApiRoute = () => (
  `${BASE_URL}/generate`
);

export const getCreatedRoute = (uuid: string) => (
  `${BASE_URL}/api/${uuid}`
);
