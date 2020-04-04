type ModalType = 'CONFIG' | 'RESPONSE';

export type ModalSliceType = {
  type: ModalType;
  isOpen: boolean;
  entityName: string;
};
