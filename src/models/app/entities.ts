import { LoadStatus, ChildType } from '../utils/utils';

export type Child = {
  type: ChildType;
  name: string;
  actualParent: string | null;
  currentParent: string | null;
  relationName: string | null;
};

export type EntityType = {
  parentName: string;
  name: string;
  allowDrop: Child[];
  children: Child[];
  fieldsLoadStatus: LoadStatus;
  fieldsLoadMessage: string;
};

export type RelatedEntityType = {
  entity: EntityType;
  relationName: string;
};

export type EntitiesSliceType = {
  entities: EntityType[];
  entitiesLoadStatus: LoadStatus;
  entitiesLoadMessage: string;
};
