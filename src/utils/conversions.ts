import { Child, RelatedEntityType } from '../models/app/entities';
import { FieldResponseModel } from '../models/api/fields';

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

export const getChildFromRelatedEntity = (
  relatedEntity: RelatedEntityType,
): Child => ({
  type: 'ENTITY',
  name: relatedEntity.entity.name,
  actualParent: null,
  currentParent: relatedEntity.entity.parentName,
  relationName: relatedEntity.relationName,
});

export const getChildrenFromRelatedEntities = (
  relatedEntities: RelatedEntityType[],
  parentName: string,
): Child[] => (
  relatedEntities.map((relatedEntity) => getChildFromRelatedEntity(relatedEntity))
);
