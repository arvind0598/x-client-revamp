import { BaseResponse } from './base-response';

export type FieldResponseModel = {
  name: string;
  type: string;
};

export type FieldsResponse = BaseResponse<FieldResponseModel[]>;
