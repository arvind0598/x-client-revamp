import { StoreType } from '../models/app/store';
import { RelationsResponseModel } from '../models/api/relations';
import { RelatedEntityType } from '../models/app/entities';
import { selectEntityByName } from './entities';
import { getEntityFromRelation } from '../utils/methods';

export const selectRelationsByEntityName = (
  state: StoreType,
  entityName: string,
): RelationsResponseModel => (
  state.relationsData.relations.filter((relation) => (relation.name === entityName))[0]
);

export const selectArrayRelatedEntitiesByName = (
  state: StoreType,
  entityName: string,
): RelatedEntityType[] => {
  const relations = selectRelationsByEntityName(state, entityName);
  if (!relations) return [];
  const { arrayRelations = null } = relations;
  if (!arrayRelations) return [];

  const relatedEntities = arrayRelations.map(
    (relation): RelatedEntityType => ({
      entity: selectEntityByName(state, relation.destTable),
      relationName: relation.relationName,
    }),
  );
  return relatedEntities;
};

export const selectObjectRelatedEntitiesByName = (
  state: StoreType,
  entityName: string,
): RelatedEntityType[] => {
  const relations = selectRelationsByEntityName(state, entityName);
  if (!relations) return [];
  const { objectRelations = null } = relations;
  if (!objectRelations) return [];

  const relatedEntities = objectRelations.map((relation): RelatedEntityType => {
    const { relationName } = relation;
    const targetName = getEntityFromRelation(relationName);
    return {
      entity: selectEntityByName(state, targetName),
      relationName,
    };
  });
  return relatedEntities;
};
