import { StoreType } from '../models/app/store';
import { LoadStatus } from '../models/utils/utils';
import { selectEntityByName } from './entities';
import { EntityType } from '../models/app/entities';

export const selectFieldsLoadStatus = (state: StoreType, entityName: string): LoadStatus => {
  const entity: EntityType = selectEntityByName(state, entityName);
  return entity.fieldsLoadStatus;
};

export const selectFieldsLoadMessage = (state: StoreType, entityName: string): string => {
  const entity: EntityType = selectEntityByName(state, entityName);
  return entity.fieldsLoadMessage;
};
