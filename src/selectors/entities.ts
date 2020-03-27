import { StoreType } from '../models/app/store';
import { EntityType } from '../models/app/entities';
import { LoadStatus } from '../models/utils/utils';
import { FieldType } from '../models/app/fields';
import { WORKSPACE_TYPE, SIDEBAR_TYPE } from '../utils/constants';

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

export const selectEntityIndexByName = (state: StoreType, entityName: string): number => (
  state.entitiesData.entities.findIndex((entity) => (
    entity.name === entityName
  ))
);

export const selectEntityByName = (state: StoreType, entityName: string): EntityType => {
  const entityIndex = selectEntityIndexByName(state, entityName);
  return state.entitiesData.entities[entityIndex];
};

export const selectFieldsFromChildren = (state: StoreType, entityName: string): FieldType[] => {
  const entityIndex = selectEntityIndexByName(state, entityName);
  const { children } = state.entitiesData.entities[entityIndex];
  const childFields = children.filter((child) => (child.type === 'FIELD')).map((field) => (field.name));
  const fields = state.fieldsData.fields.filter((field) => (
    field.currentParent === entityName && childFields.indexOf(field.name) >= 0
  ));
  return fields;
};

export const selectWorkspaceEntityNames = (state: StoreType): string[] => (
  state.entitiesData.entities
    .filter((entity) => (entity.parentName === WORKSPACE_TYPE))
    .map((entity) => (entity.name))
);

export const selectSidebarEntities = (state: StoreType): EntityType[] => (
  state.entitiesData.entities
    .filter((entity) => (entity.parentName === SIDEBAR_TYPE))
);

export const selectSidebarEntityNames = (state: StoreType): string[] => (
  selectSidebarEntities(state)
    .map((entity) => (entity.name))
);
