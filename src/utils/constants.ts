import { OperationType } from '../models/utils/utils';

export const SIDEBAR_TYPE = 'SIDEBAR_TYPE';
export const WORKSPACE_TYPE = 'WORKSPACE_TYPE';
export const OPERATION_VALUES: OperationType[] = ['<', '<=', '=', '>=', '>'];
export const OPERATION_MAP: Record<OperationType, string> = {
  '<': '_lt',
  '<=': '_le',
  '=': '_eq',
  '>=': '_ge',
  '>': '_gt',
};
