import { LoadStatus } from '../utils/utils';

export type DatabaseSliceType = {
  datasources: string[];
  datasourceLoadStatus: LoadStatus;
  datasourceLoadMessage: string;
  activeSource: string;
}

export type EntitiesSliceType = {
  entities: string[];
  entitiesLoadStatus: LoadStatus;
  entitiesLoadMessage: string;
};

export type StoreType = {
  datasourceData: DatabaseSliceType;
  entitiesData: EntitiesSliceType;
};
