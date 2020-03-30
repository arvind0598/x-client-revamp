import { EntitiesSliceType, EntityType, Child } from '../../models/app/entities';
import { BasicDragEntityAction } from './basic/dispatchers';

export const selectChildEntitiesFromSlice = (
  state: EntitiesSliceType,
  parentName: string,
): EntityType[] => (
  state.entities
    .filter((entity) => (entity.parentName === parentName))
);

export const selectCurrentIndexFromName = (
  state: EntitiesSliceType,
  entityName: string,
): number => (
  state.entities
    .findIndex((entity) => (entity.name === entityName))
);

export const getNewEntitiesForIntraMove = (
  state: EntitiesSliceType,
  parentName: string,
  action: BasicDragEntityAction,
): EntityType[] => {
  const { sourceIndex, destIndex } = action;
  const thisEntities = selectChildEntitiesFromSlice(state, parentName);
  const actualSourceIndex = selectCurrentIndexFromName(state, thisEntities[sourceIndex].name);
  const actualDestIndex = selectCurrentIndexFromName(state, thisEntities[destIndex].name);

  const actualEntities = state.entities;
  const draggedEntity = actualEntities.splice(actualSourceIndex, 1)[0];
  actualEntities.splice(actualDestIndex, 0, draggedEntity);
  return actualEntities;
};

export const getNewEntitiesForInterMove = (
  state: EntitiesSliceType,
  oldParent: string,
  newParent: string,
  action: BasicDragEntityAction,
): EntityType[] => {
  const { sourceIndex, destIndex } = action;
  const sourceEntities = selectChildEntitiesFromSlice(state, oldParent);
  const actualSourceIndex = selectCurrentIndexFromName(state, sourceEntities[sourceIndex].name);

  const destEntities = selectChildEntitiesFromSlice(state, newParent);
  const actualDestIndex = destIndex > 0
    ? selectCurrentIndexFromName(state, destEntities[destIndex - 1].name) + 1
    : 0;

  const actualEntities = state.entities;
  const draggedEntity = actualEntities.splice(actualSourceIndex, 1)[0];
  draggedEntity.parentName = newParent;
  actualEntities.splice(actualDestIndex, 0, draggedEntity);
  return actualEntities;
};

export const getAllowedDrop = (
  children: Child[],
  entityName: string,
): number => (
  children.findIndex((child) => (
    child.name === entityName && child.type === 'ENTITY'
  ))
);
