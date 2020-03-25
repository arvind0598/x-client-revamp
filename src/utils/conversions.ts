import { FieldType } from '../models/app/fields';
import { Child } from '../models/app/entities';

// eslint-disable-next-line import/prefer-default-export
export const getChildrenFromFields = (fields: FieldType[]): Child[] => (
  fields.map((field): Child => ({
    type: 'FIELD',
    name: field.name,
    actualParent: field.parentName,
  }))
);
