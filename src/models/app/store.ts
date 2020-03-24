import { LoadStatus } from '../utils/utils';
import { EntitiesSliceType } from './entities';
import { FieldsSliceType } from './fields';

export type DatabaseSliceType = {
  datasources: string[];
  datasourceLoadStatus: LoadStatus;
  datasourceLoadMessage: string;
  activeSource: string;
}

export type StoreType = {
  datasourceData: DatabaseSliceType;
  entitiesData: EntitiesSliceType;
  fieldsData: FieldsSliceType;
};
