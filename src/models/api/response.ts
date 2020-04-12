import { BaseResponse } from './base-response';

export type ApiResponse = BaseResponse<string>;

export type ApiRequest = {
  tableName: string;
  columnName: string;
  hasParent: boolean;
  hasChildren: boolean;
  field?: string;
  value?: string;
};
