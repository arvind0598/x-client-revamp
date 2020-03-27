import { EntitiesSliceType, EntityType } from '../../models/app/entities';
import { dragEntityAction } from './dispatchers';
import { SIDEBAR_TYPE } from '../../utils/constants';

const selectSidebarEntitiesFromSlice = (state: EntitiesSliceType): EntityType[] => (
  state.entities
    .filter((entity) => (entity.parentName === SIDEBAR_TYPE))
);

const selectCurrentIndexFromName = (state: EntitiesSliceType, entityName: string): number => (
  state.entities
    .findIndex((entity) => (entity.name === entityName))
);

// eslint-disable-next-line import/prefer-default-export
export const dragEntitiesReducer = (state: EntitiesSliceType, action: dragEntityAction): EntitiesSliceType => {
  switch (action.type) {
    case 'DRAG_ENTITY_IN_SIDEBAR': {
      const sidebarEntities = selectSidebarEntitiesFromSlice(state);
      const actualEntities = state.entities;

      const { sourceIndex, destIndex } = action;
      const actualSourceIndex = selectCurrentIndexFromName(state, sidebarEntities[sourceIndex].name);
      const actualDestIndex = selectCurrentIndexFromName(state, sidebarEntities[destIndex].name);

      const draggedEntity = actualEntities.splice(actualSourceIndex, 1)[0];
      actualEntities.splice(actualDestIndex, 0, draggedEntity);
      return {
        ...state,
        entities: actualEntities,
      };
    }
    case 'DRAG_ENTITY_IN_WORKSPACE': {
      return state;
    }
    default: {
      return state;
    }
  }
};
