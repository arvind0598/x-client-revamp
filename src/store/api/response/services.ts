import { ApiRequest, ApiResponse } from '../../../models/api/response';
import { apiResponseFetchStart, apiResponseFetchSuccess, apiResponseFetchError } from './dispatchers';
import { fetchApiResult } from '../../../environments/services';
import { StoreType } from '../../../models/app/store';
import { selectWorkspaceEntityNames, selectEntityByName } from '../../../selectors/entities';
import { FieldType } from '../../../models/app/fields';
import { EntityType } from '../../../models/app/entities';
import { selectVisibleFieldsFromChildren } from '../../../selectors/fields';
import { OPERATION_MAP } from '../../../utils/constants';
import { OperationType } from '../../../models/utils/utils';

const flatMapRequests = (
  a: ApiRequest[],
  b: ApiRequest[],
): ApiRequest[] => (
  [...a, ...b]
);

const buildRequestFromFields = (
  fields: FieldType[],
  relation?: string,
): ApiRequest[] => (
  fields
    .map((field): ApiRequest => ({
      tableName: relation || field.currentParent,
      columnName: field.name,
      hasParent: !!relation,
      hasChildren: false,
      ...field.operation && {
        field: OPERATION_MAP[field.operation as OperationType],
        ...field.value && {
          value: field.value,
        },
      },
    }))
);

const buildRequestFromEntity = (
  state: StoreType,
  entity: EntityType,
  relationName?: string,
): ApiRequest[] => {
  const childEntities = entity.children.filter((child) => (child.type === 'ENTITY'));
  const relationsRequestList = childEntities.map((child): ApiRequest => ({
    tableName: entity.name,
    columnName: child.relationName as string,
    hasParent: !!relationName,
    hasChildren: true,
  }));

  const thisEntityFields = selectVisibleFieldsFromChildren(state, entity.name);
  const fieldsRequestList = buildRequestFromFields(thisEntityFields, relationName);
  const recursiveList = childEntities.map((child) => {
    const childEntity = selectEntityByName(state, child.name);
    return buildRequestFromEntity(state, childEntity, child.relationName || undefined);
  });

  const flatRecursiveList = recursiveList.reduce(flatMapRequests, []);

  return [...relationsRequestList, ...fieldsRequestList, ...flatRecursiveList];
};

const buildRequest = (
  state: StoreType,
): ApiRequest[] => {
  const requestList: ApiRequest[] = [];
  const rootWorkspaceEntityNames = selectWorkspaceEntityNames(state);

  rootWorkspaceEntityNames.forEach((entityName) => {
    const thisEntity = selectEntityByName(state, entityName);
    const thisEntityRequestList = buildRequestFromEntity(state, thisEntity);
    requestList.push(...thisEntityRequestList);
  });
  return requestList;
};

// eslint-disable-next-line import/prefer-default-export
export const apiResponseFetch = (body: StoreType) => (dispatch: Function): void => {
  dispatch(apiResponseFetchStart());

  const requestData = buildRequest(body);
  console.log(JSON.stringify(requestData));

  fetchApiResult(requestData)
    .then((response: ApiResponse) => {
      if (response.success) {
        dispatch(apiResponseFetchSuccess(response.data));
      }
      else throw new Error(response.message);
    })
    .catch((error) => dispatch(apiResponseFetchError(error)));
};
