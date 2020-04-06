type ModalType = 'CONFIG' | 'MAIN';

export type ModalSliceType = {
  type: ModalType;
  isOpen: boolean;
  entityName: string;
};
