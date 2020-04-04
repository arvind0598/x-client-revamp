import { ModalSliceType } from '../../models/app/modal';
import defaultStore from './default-store';
import { ModalAction } from './dispatchers';

const modalReducer = (
  state: ModalSliceType = defaultStore,
  action: ModalAction,
): ModalSliceType => {
  switch (action.type) {
    case 'MODAL_CONFIG_OPEN': {
      return {
        ...state,
        isOpen: true,
        type: 'CONFIG',
        entityName: action.entityName,
      };
    }
    case 'MODAL_CONFIG_CLOSE': {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
