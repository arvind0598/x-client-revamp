import {
  MODAL_CONFIG_OPEN,
  MODAL_CONFIG_CLOSE,
} from './types';

type ModalConfigOpenAction = {
  type: typeof MODAL_CONFIG_OPEN;
  entityName: string;
};
export const modalConfigOpen = (
  entityName: string,
): ModalConfigOpenAction => ({
  type: 'MODAL_CONFIG_OPEN',
  entityName,
});

type ModalConfigCloseAction = {
  type: typeof MODAL_CONFIG_CLOSE;
};
export const modalConfigClose = (
): ModalConfigCloseAction => ({
  type: 'MODAL_CONFIG_CLOSE',
});

export type ModalConfigAction = ModalConfigOpenAction
| ModalConfigCloseAction;

export type ModalAction = ModalConfigAction;
