import {
  MODAL_CONFIG_OPEN,
  MODAL_CONFIG_CLOSE,
  FIELD_TOGGLE,
  FIELD_SET_OPERATION,
  FIELD_SET_VALUE,
  FIELD_CLEAR_OPERATION,
} from './types';
import { OperationType } from '../../models/utils/utils';

type ModalConfigOpenAction = {
  type: typeof MODAL_CONFIG_OPEN;
  entityName: string;
};
export const modalConfigOpen = (
  entityName: string,
): ModalConfigOpenAction => ({
  type: MODAL_CONFIG_OPEN,
  entityName,
});

type ModalConfigCloseAction = {
  type: typeof MODAL_CONFIG_CLOSE;
};
export const modalConfigClose = (
): ModalConfigCloseAction => ({
  type: MODAL_CONFIG_CLOSE,
});

export type ModalConfigAction = ModalConfigOpenAction
| ModalConfigCloseAction;

export type ModalAction = ModalConfigAction;

type FieldDetails = {
  entityName: string;
  fieldName: string;
};

type FieldToggleAction = FieldDetails & {
  type: typeof FIELD_TOGGLE;
};
export const fieldToggle = (
  entityName: string,
  fieldName: string,
): FieldToggleAction => ({
  type: FIELD_TOGGLE,
  entityName,
  fieldName,
});

type FieldSetOperationAction = FieldDetails & {
  type: typeof FIELD_SET_OPERATION;
  operation: OperationType;
};
export const fieldSetOperation = (
  entityName: string,
  fieldName: string,
  operation: OperationType,
): FieldSetOperationAction => ({
  type: FIELD_SET_OPERATION,
  entityName,
  fieldName,
  operation,
});

type FieldClearOperationAction = FieldDetails & {
  type: typeof FIELD_CLEAR_OPERATION;
};
export const fieldClearOperation = (
  entityName: string,
  fieldName: string,
): FieldClearOperationAction => ({
  type: FIELD_CLEAR_OPERATION,
  entityName,
  fieldName,
});

type FieldSetValueAction = FieldDetails & {
  type: typeof FIELD_SET_VALUE;
  value: string;
};
export const fieldSetValue = (
  entityName: string,
  fieldName: string,
  value: string,
): FieldSetValueAction => ({
  type: FIELD_SET_VALUE,
  entityName,
  fieldName,
  value,
});

export type FieldAction = FieldToggleAction
| FieldSetOperationAction
| FieldClearOperationAction
| FieldSetValueAction;
