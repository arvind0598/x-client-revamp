import { apiFieldsFetchSuccess, apiFieldsFetchStart, apiFieldsFetchError } from './dispatchers';
import { fetchFields } from '../../../environments/services';
import { FieldsResponse, FieldResponseModel } from '../../../models/api/fields';
import { FieldType } from '../../../models/app/fields';
import { relationsSetup } from '../relations/dispatchers';

const makeFields = (responses: FieldResponseModel[], entityName: string): FieldType[] => (
  responses.map((response): FieldType => ({
    ...response,
    actualParent: entityName,
    currentParent: entityName,
  }))
);

/* eslint-disable import/prefer-default-export */
export const apiFieldsFetch = (entityName: string) => (dispatch: Function): void => {
  dispatch(apiFieldsFetchStart(entityName));
  fetchFields(entityName)
    .then((response: FieldsResponse) => {
      if (response.success) {
        const fieldsData = makeFields(response.data, entityName);
        dispatch(apiFieldsFetchSuccess(entityName, fieldsData));
        dispatch(relationsSetup(entityName));
      }
      else {
        throw new Error(response.message);
      }
    })
    .catch((error) => dispatch(apiFieldsFetchError(entityName, error)));
};
