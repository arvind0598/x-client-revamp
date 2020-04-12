import { ModalSliceType } from '../../models/app/modal';
import defaultStore from './default-store';
import { ModalAction, FieldAction } from './dispatchers';
import { FieldsSliceType, FieldType } from '../../models/app/fields';

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
    case 'MODAL_MAIN_OPEN': {
      const newState = { ...state };
      delete newState.entityName;
      newState.isOpen = true;
      newState.type = 'MAIN';
      return newState;
    }
    case 'MODAL_MAIN_CLOSE': {
      const newState = { ...state };
      delete newState.response;
      newState.isOpen = false;
      newState.status = 'INIT';
      return newState;
    }
    case 'MODAL_NEWDB_OPEN': {
      return {
        ...state,
        isOpen: true,
        type: 'NEWDB',
      };
    }
    case 'MODAL_NEWDB_CLOSE': {
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

const getFieldsAndIndexFromSlice = (
  state: FieldsSliceType,
  action: FieldAction,
): [FieldType[], number] => {
  const { entityName, fieldName } = action;
  const newFields = [...state.fields];
  const thisFieldIndex = newFields.findIndex((field) => (
    field.name === fieldName && field.currentParent === entityName
  ));
  return [newFields, thisFieldIndex];
};

export const fieldsReducer = (
  state: FieldsSliceType,
  action: FieldAction,
): FieldsSliceType => {
  switch (action.type) {
    case 'FIELD_TOGGLE': {
      const [newFields, thisFieldIndex] = getFieldsAndIndexFromSlice(state, action);
      newFields[thisFieldIndex].selected = !newFields[thisFieldIndex].selected;
      return {
        ...state,
        fields: newFields,
      };
    }
    case 'FIELD_SET_OPERATION': {
      const [newFields, thisFieldIndex] = getFieldsAndIndexFromSlice(state, action);
      newFields[thisFieldIndex].operation = action.operation;
      return {
        ...state,
        fields: newFields,
      };
    }
    case 'FIELD_CLEAR_OPERATION': {
      const [newFields, thisFieldIndex] = getFieldsAndIndexFromSlice(state, action);
      delete newFields[thisFieldIndex].operation;
      return {
        ...state,
        fields: newFields,
      };
    }
    case 'FIELD_SET_VALUE': {
      const [newFields, thisFieldIndex] = getFieldsAndIndexFromSlice(state, action);
      newFields[thisFieldIndex].value = action.value;
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
