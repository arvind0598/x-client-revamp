import { EntitiesSliceType } from '../../../models/app/entities';
import { NestedDragEntitiesAction } from './dispatchers';
import { selectCurrentIndexFromName, getAllowedDrop } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const nestedDragEntitiesReducer = (
  state: EntitiesSliceType,
  action: NestedDragEntitiesAction,
): EntitiesSliceType => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};
