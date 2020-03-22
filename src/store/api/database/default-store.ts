import { DatabaseSliceType } from '../../../models/app/store';

const store: DatabaseSliceType = {
  datasources: [],
  datasourceLoadStatus: 'INIT',
  datasourceLoadMessage: 'Datasources not loaded.',
  activeSource: '',
};

export default store;
