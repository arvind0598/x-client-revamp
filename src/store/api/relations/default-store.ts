import { RelationsSliceType } from '../../../models/app/store';

const store: RelationsSliceType = {
  relations: [],
  relationsLoadStatus: 'INIT',
  relationsLoadMessage: 'Relations not loaded.',
};

export default store;
