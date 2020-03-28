import { BaseResponse } from './base-response';

export type ArrayRelation = {
  relationName: string;
  destTable: string;
  destColumn: string;
};

export type ObjectRelation = {
  relationName: string;
  sourceColumn: string;
};

export type RelationsResponseModel = {
  name: string;
  objectRelations?: ObjectRelation[];
  arrayRelations?: ArrayRelation[];
};

export type RelationsResponse = BaseResponse<RelationsResponseModel[]>;
