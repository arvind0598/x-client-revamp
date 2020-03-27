import {
  DRAG_ENTITY_IN_SIDEBAR,
  DRAG_ENTITY_IN_WORKSPACE,
} from './types';

type Indices = {
  sourceIndex: number;
  destIndex: number;
}

type DragEntityInSidebarAction = Indices & {
  type: typeof DRAG_ENTITY_IN_SIDEBAR;
};
// eslint-disable-next-line max-len
export const dragEntityInSidebar = (sourceIndex: number, destIndex: number): DragEntityInSidebarAction => ({
  type: DRAG_ENTITY_IN_SIDEBAR,
  sourceIndex,
  destIndex,
});

type DragEntityInWorkspaceAction = Indices & {
  type: typeof DRAG_ENTITY_IN_WORKSPACE;
};
// eslint-disable-next-line max-len
export const dragEntityInWorkspace = (sourceIndex: number, destIndex: number): DragEntityInWorkspaceAction => ({
  type: DRAG_ENTITY_IN_WORKSPACE,
  sourceIndex,
  destIndex,
});

export type dragEntityAction = DragEntityInSidebarAction
| DragEntityInWorkspaceAction;
