import {
  DRAG_FIELD_IN_ENTITY,
  DRAG_FIELD_BETWEEN_ENTITIES,
} from './types';

type Indices = {
  sourceIndex: number;
  destIndex: number;
};

type DragFieldInEntityAction = Indices & {
  type: typeof DRAG_FIELD_IN_ENTITY;
  entityName: string;
};
export const DragFieldInEntity = (
  entityName: string,
  sourceIndex: number,
  destIndex: number,
): DragFieldInEntityAction => ({
  type: DRAG_FIELD_IN_ENTITY,
  entityName,
  sourceIndex,
  destIndex,
});

type DragFieldBetweenEntitiesAction = Indices & {
  type: typeof DRAG_FIELD_BETWEEN_ENTITIES;
  sourceEntity: string;
  destEntity: string;
};
export const DragFieldBetweenEntities = (
  sourceEntity: string,
  sourceIndex: number,
  destEntity: string,
  destIndex: number,
): DragFieldBetweenEntitiesAction => ({
  type: DRAG_FIELD_BETWEEN_ENTITIES,
  sourceEntity,
  destEntity,
  sourceIndex,
  destIndex,
});

export type DragFieldsAction = DragFieldInEntityAction
| DragFieldBetweenEntitiesAction;
