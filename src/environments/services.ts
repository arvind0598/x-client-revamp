import { DatabasesResponse } from '../models/api/databases';
import * as routes from './routes';
import { Mode } from '../models/utils/utils';
import { EntitiesResponse } from '../models/api/entities';

import databases from './data/databases.json';
import entities from './data/entities.json';

const currentMode: Mode = 'DEV';

const fetchData = (route: string): Promise<unknown> => (
  fetch(route).then((data) => data.json() as unknown)
);

const resolveIfDev = (response: unknown) => new Promise(
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
