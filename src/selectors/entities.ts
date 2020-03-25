import { StoreType } from '../models/app/store';
import { EntityType } from '../models/app/entities';
import { LoadStatus } from '../models/utils/utils';
import { FieldType } from '../models/app/fields';

export const selectEntityLoadStatus = (state: StoreType): LoadStatus => (
  state.entitiesData.entitiesLoadStatus
);

export const selectEntitiesLoadMessage = (state: StoreType): string => (
  state.entitiesData.entitiesLoadMessage
);

export const selectEntities = (state: StoreType): EntityType[] => (
  state.entitiesData.entities
);

export const selectEntityNames = (state: StoreType): string[] => (
  state.entitiesData.entities.map((entity) => (entity.name))
);

export const selectEntityByName = (state: StoreType, entityName: string): EntityType => {
  const entityIndex = state.entitiesData.entities.findIndex((entity) => (
    entity.name === entityName
  ));
  return state.entitiesData.entities[entityIndex];
};

export const selectFieldsFromChildren = (state: StoreType, entityName: string): FieldType[] => {
  const entityIndex = state.entitiesData.entities.findIndex(
    (entity) => (entity.name === entityName),
  );
  const { children } = state.entitiesData.entities[entityIndex];
  const childFields = children.filter((child) => (child.type === 'FIELD')).map((field) => (field.name));
  const fields = state.fieldsData.fields.filter((field) => (
    field.parentName === entityName && childFields.indexOf(field.name) >= 0
  ));
  return fields;
};
