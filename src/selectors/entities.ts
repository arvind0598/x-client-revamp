import { StoreType } from '../models/app/store';

// eslint-disable-next-line import/prefer-default-export
export const selectEntityByName = (state: StoreType, name: string): string => (
  state.entitiesData.entities.filter((entity) => entity === name)[0]
);
