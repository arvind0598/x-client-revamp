import { EntitiesSliceType } from '../../../models/app/entities';
import { BasicDragEntityAction } from './dispatchers';
import { SIDEBAR_TYPE, WORKSPACE_TYPE } from '../../../utils/constants';
import { getNewEntitiesForIntraMove, getNewEntitiesForInterMove } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const dragEntitiesReducer = (
  state: EntitiesSliceType,
  action: BasicDragEntityAction,
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
      const newEntities = getNewEntitiesForIntraMove(state, WORKSPACE_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE': {
      const newEntities = getNewEntitiesForInterMove(state, SIDEBAR_TYPE, WORKSPACE_TYPE, action);
      return {
        ...state,
        entities: newEntities,
      };
    }
    case 'DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR': {
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
