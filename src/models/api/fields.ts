import { BaseResponse } from './BaseResponse';

export type FieldResponseModel = {
  name: string;
  type: string;
};

export type FieldsResponse = BaseResponse<FieldResponseModel[]>;
