import { EntitiesSliceType } from '../../../models/app/entities';

const store: EntitiesSliceType = {
  entities: [],
  entitiesLoadStatus: 'INIT',
  entitiesLoadMessage: 'Entities not loaded.',
};

export default store;
