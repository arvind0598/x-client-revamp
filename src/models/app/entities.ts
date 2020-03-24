import { LoadStatus, ChildType } from '../utils/utils';

export type Child = {
  type: ChildType;
  name: string;
};

export type EntityType = {
  parentName: string;
  name: string;
  allowDrop: Child[];
  children: Child[];
  fieldsLoadStatus: LoadStatus;
  fieldsLoadMessage: string;
};

export type EntitiesSliceType = {
  entities: EntityType[];
  entitiesLoadStatus: LoadStatus;
  entitiesLoadMessage: string;
};
