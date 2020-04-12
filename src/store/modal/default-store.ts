import { ModalSliceType } from '../../models/app/modal';

const store: ModalSliceType = {
  type: 'CONFIG',
  isOpen: false,
  entityName: '',
  status: 'INIT',
};

export default store;
