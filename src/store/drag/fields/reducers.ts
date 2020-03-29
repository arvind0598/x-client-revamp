import { StoreType } from '../../../models/app/store';
import { DragFieldsAction } from './dispatchers';

// eslint-disable-next-line import/prefer-default-export
export const dragFieldsReducer = (
  state: StoreType,
  action: DragFieldsAction,
): StoreType => {
  switch (action.type) {
    case 'DRAG_FIELD_IN_ENTITY': {
      console.log(action);
      return state;
    }
    default: {
      return state;
    }
  }
};
