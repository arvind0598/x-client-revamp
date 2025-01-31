import { DropResult } from 'react-beautiful-dnd';
import { getDroppable, getDraggableName } from '../../utils/methods';
import { SIDEBAR_TYPE, WORKSPACE_TYPE } from '../../utils/constants';
import {
  dragEntityInSidebar,
  dragEntityInWorkspace,
  dragEntityFromSidebarToWorkspace,
  dragEntityFromWorkspaceToSidebar,
} from './basic/dispatchers';
import {
  dragEntityFromSidebarToEntity,
  dragEntityFromEntityToSidebar,
  dragEntityFromWorkspaceToEntity,
  dragEntityFromEntityToWorkspace,
} from './nested/dispatchers';

// eslint-disable-next-line import/prefer-default-export
export const handleDragEnd = (result: DropResult) => (dispatch: Function): void => {
  const source = getDroppable(result.source.droppableId);
  if (!result.destination) return;

  const destination = getDroppable(result.destination.droppableId);

  const sourceIndex = result.source.index;
  const destIndex = result.destination.index;

  if (source === SIDEBAR_TYPE) {
    if (destination === SIDEBAR_TYPE) {
      dispatch(dragEntityInSidebar(sourceIndex, destIndex));
    }
    else if (destination === WORKSPACE_TYPE) {
      dispatch(dragEntityFromSidebarToWorkspace(sourceIndex, destIndex));
    }
    else {
      const destEntity = result.destination.droppableId;
      const draggedEntity = getDraggableName(result.draggableId);
      dispatch(dragEntityFromSidebarToEntity(sourceIndex, destIndex, destEntity, draggedEntity));
    }
  }
  else if (source === WORKSPACE_TYPE) {
    if (destination === SIDEBAR_TYPE) {
      dispatch(dragEntityFromWorkspaceToSidebar(sourceIndex, destIndex));
    }
    else if (destination === WORKSPACE_TYPE) {
      dispatch(dragEntityInWorkspace(sourceIndex, destIndex));
    }
    else {
      const destEntity = result.destination.droppableId;
      const draggedEntity = getDraggableName(result.draggableId);
      dispatch(dragEntityFromWorkspaceToEntity(sourceIndex, destIndex, destEntity, draggedEntity));
    }
  }
  else if (destination === SIDEBAR_TYPE) {
    const sourceEntity = result.source.droppableId;
    const draggedEntity = getDraggableName(result.draggableId);
    dispatch(dragEntityFromEntityToSidebar(sourceIndex, destIndex, sourceEntity, draggedEntity));
  }
  else if (destination === WORKSPACE_TYPE) {
    const sourceEntity = result.source.droppableId;
    const draggedEntity = getDraggableName(result.draggableId);
    dispatch(dragEntityFromEntityToWorkspace(sourceIndex, destIndex, sourceEntity, draggedEntity));
  }
  else {
    console.log('unsupported');
  }
};
