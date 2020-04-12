import { BaseResponse } from './base-response';

export type AddSourceResponse = BaseResponse<string>;

export type AddSourceRequest = {
  datasourceName: string;
  datasourceUrl: string;
};
