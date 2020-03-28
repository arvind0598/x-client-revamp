import { RelationsSliceType } from '../../../models/app/store';
import defaultStore from './default-store';
import { ApiRelationsAction } from './dispatchers';

// eslint-disable-next-line import/prefer-default-export
export const apiRelationsReducer = (
  state: RelationsSliceType = defaultStore,
  action: ApiRelationsAction,
): RelationsSliceType => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
