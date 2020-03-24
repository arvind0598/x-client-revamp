import { StoreType } from '../models/app/store';
import { EntityType } from '../models/app/entities';
import { LoadStatus } from '../models/utils/utils';

export const selectEntityLoadStatus = (state: StoreType): LoadStatus => (
  state.entitiesData.entitiesLoadStatus
);

export const selectEntitiesLoadMessage = (state: StoreType): string => (
  state.entitiesData.entitiesLoadMessage
);

export const selectEntities = (state: StoreType): EntityType[] => (
  state.entitiesData.entities
);

export const selectEntityNames = (state: StoreType): string[] => (
  state.entitiesData.entities.map((entity) => (entity.name))
);
