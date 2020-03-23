import { EntitiesSliceType } from '../../../models/app/store';

const store: EntitiesSliceType = {
  entities: [],
  entitiesLoadStatus: 'INIT',
  entitiesLoadMessage: 'Entities not loaded.',
};

export default store;
