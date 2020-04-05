import {
  MODAL_CONFIG_OPEN,
  MODAL_CONFIG_CLOSE,
  FIELD_TOGGLE,
} from './types';

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

type FieldToggleAction = {
  type: typeof FIELD_TOGGLE;
  entityName: string;
  fieldName: string;
};
export const fieldToggle = (
  entityName: string,
  fieldName: string,
): FieldToggleAction => ({
  type: FIELD_TOGGLE,
  entityName,
  fieldName,
});

export type FieldAction = FieldToggleAction;
