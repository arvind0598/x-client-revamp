import { DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY, DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR } from './types';

type Indices = {
  sourceIndex: number;
  destIndex: number;
};

type DragEntityFromSidebarToEntityAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY;
  destEntity: string;
  draggedEntity: string;
};
export const dragEntityFromSidebarToEntity = (
  sourceIndex: number,
  destIndex: number,
  destEntity: string,
  draggedEntity: string,
): DragEntityFromSidebarToEntityAction => ({
  type: DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY,
  sourceIndex,
  destIndex,
  destEntity,
  draggedEntity,
});

type DragEntityFromEntityToSidebarAction = {
  type: typeof DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR;
  sourceEntity: string;
  draggedEntity: string;
};
export const dragEntityFromEntityToSidebar = (
  sourceEntity: string,
  draggedEntity: string,
): DragEntityFromEntityToSidebarAction => ({
  type: DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR,
  sourceEntity,
  draggedEntity,
});

export type NestedDragEntitiesAction = DragEntityFromEntityToSidebarAction
| DragEntityFromSidebarToEntityAction;
