import {
  DRAG_ENTITY_IN_SIDEBAR,
  DRAG_ENTITY_IN_WORKSPACE,
  DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE,
  DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR,
} from './types';

type Indices = {
  sourceIndex: number;
  destIndex: number;
}

type DragEntityInSidebarAction = Indices & {
  type: typeof DRAG_ENTITY_IN_SIDEBAR;
};
export const dragEntityInSidebar = (
  sourceIndex: number,
  destIndex: number,
): DragEntityInSidebarAction => ({
  type: DRAG_ENTITY_IN_SIDEBAR,
  sourceIndex,
  destIndex,
});

type DragEntityInWorkspaceAction = Indices & {
  type: typeof DRAG_ENTITY_IN_WORKSPACE;
};
export const dragEntityInWorkspace = (
  sourceIndex: number,
  destIndex: number,
): DragEntityInWorkspaceAction => ({
  type: DRAG_ENTITY_IN_WORKSPACE,
  sourceIndex,
  destIndex,
});

type DragEntityFromSidebarToWorkspaceAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE;
}
export const dragEntityFromSidebarToWorkspace = (
  sourceIndex: number,
  destIndex: number,
): DragEntityFromSidebarToWorkspaceAction => ({
  type: DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE,
  sourceIndex,
  destIndex,
});

type DragEntityFromWorkspaceToSidebarAction = Indices & {
  type: typeof DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR;
}
export const dragEntityFromWorkspaceToSidebar = (
  sourceIndex: number,
  destIndex: number,
): DragEntityFromWorkspaceToSidebarAction => ({
  type: DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR,
  sourceIndex,
  destIndex,
});

export type DragEntityAction = DragEntityInSidebarAction
| DragEntityInWorkspaceAction
| DragEntityFromSidebarToWorkspaceAction
| DragEntityFromWorkspaceToSidebarAction;
