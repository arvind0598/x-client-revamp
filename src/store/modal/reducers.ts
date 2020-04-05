import { ModalSliceType } from '../../models/app/modal';
import defaultStore from './default-store';
import { ModalAction, FieldAction } from './dispatchers';
import { FieldsSliceType } from '../../models/app/fields';

export const modalReducer = (
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

export const fieldsReducer = (
  state: FieldsSliceType,
  action: FieldAction,
): FieldsSliceType => {
  switch (action.type) {
    case 'FIELD_TOGGLE': {
      const { entityName, fieldName } = action;
      const thisFieldIndex = state.fields.findIndex((field) => (
        field.name === fieldName && field.currentParent === entityName
      ));
      const newFields = [...state.fields];
      newFields[thisFieldIndex].selected = !newFields[thisFieldIndex].selected;
      return {
        ...state,
        fields: newFields,
      };
    }
    default: {
      return state;
    }
  }
};
