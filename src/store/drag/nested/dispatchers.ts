import {
  DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY,
  DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR,
  DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY,
  DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE,
} from './types';

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

type DragEntityFromEntityToSidebarAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR;
  sourceEntity: string;
  draggedEntity: string;
};
export const dragEntityFromEntityToSidebar = (
  sourceIndex: number,
  destIndex: number,
  sourceEntity: string,
  draggedEntity: string,
): DragEntityFromEntityToSidebarAction => ({
  type: DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR,
  sourceIndex,
  destIndex,
  sourceEntity,
  draggedEntity,
});

type DragEntityFromWorkspaceToEntityAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY;
  destEntity: string;
  draggedEntity: string;
};
export const dragEntityFromWorkspaceToEntity = (
  sourceIndex: number,
  destIndex: number,
  destEntity: string,
  draggedEntity: string,
): DragEntityFromWorkspaceToEntityAction => ({
  type: DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY,
  sourceIndex,
  destIndex,
  destEntity,
  draggedEntity,
});

type DragEntityFromEntityToWorkspaceAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE;
  sourceEntity: string;
  draggedEntity: string;
};
export const dragEntityFromEntityToWorkspace = (
  sourceIndex: number,
  destIndex: number,
  sourceEntity: string,
  draggedEntity: string,
): DragEntityFromEntityToWorkspaceAction => ({
  type: DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE,
  sourceIndex,
  destIndex,
  sourceEntity,
  draggedEntity,
});

export type NestedDragEntitiesAction = DragEntityFromEntityToSidebarAction
| DragEntityFromSidebarToEntityAction
| DragEntityFromWorkspaceToEntityAction
| DragEntityFromEntityToWorkspaceAction;
