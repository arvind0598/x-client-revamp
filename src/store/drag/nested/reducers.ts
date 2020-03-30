import { EntitiesSliceType, EntityType } from '../../../models/app/entities';
import { NestedDragEntitiesAction } from './dispatchers';
import { selectCurrentIndexFromName, getAllowedDrop } from '../utils';
import { SIDEBAR_TYPE, WORKSPACE_TYPE } from '../../../utils/constants';

const moveEntityToParent = (
  state: EntitiesSliceType,
  action: NestedDragEntitiesAction,
  parentName: string,
): EntityType[] => {
  const { sourceEntity, draggedEntity } = action;
  const newEntities = [...state.entities];

  const sourceEntityIndex = selectCurrentIndexFromName(state, sourceEntity);
  const draggedEntityIndex = selectCurrentIndexFromName(state, draggedEntity);
  newEntities[draggedEntityIndex].parentName = parentName;
  const childIndex = newEntities[sourceEntityIndex].children.findIndex((child) => (
    child.type === 'ENTITY' && child.name === draggedEntity
  ));
  newEntities[sourceEntityIndex].children.splice(childIndex, 1);
  return newEntities;
};

// eslint-disable-next-line import/prefer-default-export
export const nestedDragEntitiesReducer = (
  state: EntitiesSliceType,
  action: NestedDragEntitiesAction,
): EntitiesSliceType => {
  switch (action.type) {
    case 'DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY':
    case 'DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY': {
      const { destIndex, destEntity, draggedEntity } = action;
      const newEntities = [...state.entities];

      const destEntityIndex = selectCurrentIndexFromName(state, destEntity);
      const allowedDrop = getAllowedDrop(newEntities[destEntityIndex].allowDrop, draggedEntity);
      if (allowedDrop < 0) return state;

      const draggedEntityIndex = selectCurrentIndexFromName(state, draggedEntity);
      newEntities[draggedEntityIndex].parentName = destEntity;
      const newChild = newEntities[destEntityIndex].allowDrop[allowedDrop];
      newEntities[destEntityIndex].children.splice(destIndex, 0, newChild);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE': {
      const entities = moveEntityToParent(state, action, WORKSPACE_TYPE);
      return {
        ...state,
        entities,
      };
    }
    case 'DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR': {
      const entities = moveEntityToParent(state, action, SIDEBAR_TYPE);
      return {
        ...state,
        entities,
      };
    }
    default: {
      return state;
    }
  }
};
