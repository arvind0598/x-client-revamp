import { LoadStatus } from '../utils/utils';
import { EntitiesSliceType } from './entities';
import { FieldsSliceType } from './fields';
import { RelationsResponseModel } from '../api/relations';
import { ModalSliceType } from './modal';

export type DatabaseSliceType = {
  datasources: string[];
  datasourceLoadStatus: LoadStatus;
  datasourceLoadMessage: string;
  activeSource: string;
};

export type RelationsSliceType = {
  relations: RelationsResponseModel[];
  relationsLoadStatus: LoadStatus;
  relationsLoadMessage: string;
};

export type StoreType = {
  datasourceData: DatabaseSliceType;
  entitiesData: EntitiesSliceType;
  fieldsData: FieldsSliceType;
  relationsData: RelationsSliceType;
  modalData: ModalSliceType;
};
