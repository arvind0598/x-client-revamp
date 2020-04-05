import { StoreType } from '../models/app/store';
import { LoadStatus } from '../models/utils/utils';
import { selectEntityByName, selectEntityIndexByName } from './entities';
import { EntityType } from '../models/app/entities';
import { FieldType } from '../models/app/fields';

export const selectFieldsLoadStatus = (
  state: StoreType,
  entityName: string,
): LoadStatus => {
  const entity: EntityType = selectEntityByName(state, entityName);
  return entity.fieldsLoadStatus;
};

export const selectFieldsLoadMessage = (
  state: StoreType,
  entityName: string,
): string => {
  const entity: EntityType = selectEntityByName(state, entityName);
  return entity.fieldsLoadMessage;
};

export const selectFieldsFromChildren = (
  state: StoreType,
  entityName: string,
): FieldType[] => {
  const entityIndex = selectEntityIndexByName(state, entityName);
  const { children } = state.entitiesData.entities[entityIndex];
  const childFields = children.filter((child) => (child.type === 'FIELD')).map((field) => (field.name));
  const fields = state.fieldsData.fields.filter((field) => (
    field.currentParent === entityName && childFields.indexOf(field.name) >= 0
  ));
  return fields;
};

export const selectVisibleFieldsFromChildren = (
  state: StoreType,
  entityName: string,
): FieldType[] => (
  selectFieldsFromChildren(state, entityName)
    .filter((field) => (field.selected))
);

export const selectHiddenFieldsFromChildren = (
  state: StoreType,
  entityName: string,
): FieldType[] => (
  selectFieldsFromChildren(state, entityName)
    .filter((field) => (!field.selected))
);
