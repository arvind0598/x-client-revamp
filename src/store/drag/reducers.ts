import { EntitiesSliceType, EntityType } from '../../models/app/entities';
import { DragEntityAction } from './dispatchers';
import { SIDEBAR_TYPE, WORKSPACE_TYPE } from '../../utils/constants';

const selectChildEntitiesFromSlice = (
  state: EntitiesSliceType,
  parentName: string,
): EntityType[] => (
  state.entities
    .filter((entity) => (entity.parentName === parentName))
);

const selectCurrentIndexFromName = (
  state: EntitiesSliceType,
  entityName: string,
): number => (
  state.entities
    .findIndex((entity) => (entity.name === entityName))
);

const getNewEntitiesForIntraMove = (
  state: EntitiesSliceType,
  parentName: string,
  action: DragEntityAction,
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

const getNewEntitiesForInterMove = (
  state: EntitiesSliceType,
  oldParent: string,
  newParent: string,
  action: DragEntityAction,
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

// eslint-disable-next-line import/prefer-default-export
export const dragEntitiesReducer = (
  state: EntitiesSliceType,
  action: DragEntityAction,
): EntitiesSliceType => {
  switch (action.type) {
    case 'DRAG_ENTITY_IN_SIDEBAR': {
      const newEntities = getNewEntitiesForIntraMove(state, SIDEBAR_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_IN_WORKSPACE': {
      const { sourceIndex, destIndex } = action;
      const newEntities = getNewEntitiesForIntraMove(state, WORKSPACE_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE': {
      const { sourceIndex, destIndex } = action;
      const newEntities = getNewEntitiesForInterMove(state, SIDEBAR_TYPE, WORKSPACE_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR': {
      const { sourceIndex, destIndex } = action;
      const newEntities = getNewEntitiesForInterMove(state, WORKSPACE_TYPE, SIDEBAR_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    default: {
      return state;
    }
  }
};
