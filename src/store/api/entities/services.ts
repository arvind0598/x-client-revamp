import { apiDatabaseChoose } from '../database/dispatchers';
import {
  apiEntitiesClear,
  apiEntitiesFetchStart,
  apiEntitiesFetchSuccess,
  apiEntitiesFetchError,
} from './dispatchers';
import { fetchEntities } from '../../../environments/services';
import { EntitiesResponse } from '../../../models/api/entities';
import { EntityType } from '../../../models/app/entities';
import { SIDEBAR_TYPE } from '../../../utils/constants';
import { apiRelationsFetch } from '../relations/services';

const makeEntities = (entityNames: string[]): EntityType[] => (
  entityNames.map((entityName: string): EntityType => ({
    parentName: SIDEBAR_TYPE,
    name: entityName,
    allowDrop: [],
    children: [],
    fieldsLoadStatus: 'INIT',
    fieldsLoadMessage: 'The fields have not been loaded.',
  }))
);

/* eslint-disable import/prefer-default-export */
export const apiEntitiesFetchAfterChoose = (source: string) => (dispatch: Function): void => {
  dispatch(apiDatabaseChoose(source));
  dispatch(apiEntitiesClear());
  dispatch(apiEntitiesFetchStart());
  fetchEntities(source)
    .then((response: EntitiesResponse) => {
      if (response.success) {
        const entitiesData = makeEntities(response.data);
        dispatch(apiEntitiesFetchSuccess(entitiesData));
        setTimeout(() => {
          dispatch(apiRelationsFetch(source));
        }, 1000);
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiEntitiesFetchError(error)));
};
