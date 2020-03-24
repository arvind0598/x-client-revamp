import { StoreType } from '../models/app/store';
import { LoadStatus } from '../models/utils/utils';

export const selectDatasourceNames = (state: StoreType): string[] => (
  state.datasourceData.datasources
);

export const selectDatasourceLoadStatus = (state: StoreType): LoadStatus => (
  state.datasourceData.datasourceLoadStatus
);
