import { Child } from '../models/app/entities';
import { FieldResponseModel } from '../models/api/fields';

// eslint-disable-next-line import/prefer-default-export
export const getChildrenFromFields = (
  parentName: string,
  fields: FieldResponseModel[],
): Child[] => (
  fields.map((field): Child => ({
    type: 'FIELD',
    name: field.name,
    actualParent: parentName,
    currentParent: parentName,
    relationName: null,
  }))
);
