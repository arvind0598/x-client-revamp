import { LoadStatus } from '../utils/utils';

type ModalType = 'CONFIG' | 'MAIN' | 'NEWDB';

export type ModalSliceType = {
  type: ModalType;
  isOpen: boolean;
  entityName: string;
  status: LoadStatus;
  response?: string;
};
