import { DropResult } from 'react-beautiful-dnd';
import { getDroppable } from '../../utils/methods';
import { SIDEBAR_TYPE, WORKSPACE_TYPE } from '../../utils/constants';
import { dragEntityInSidebar, dragEntityInWorkspace } from './dispatchers';

// eslint-disable-next-line import/prefer-default-export
export const handleDragEnd = (result: DropResult) => (dispatch: Function): void => {
  const source = getDroppable(result.source.droppableId);
  if (!result.destination) return;

  const destination = getDroppable(result.destination.droppableId);

  const sourceIndex = result.source.index;
  const destIndex = result.destination.index;

  if (source === SIDEBAR_TYPE && destination === SIDEBAR_TYPE) {
    dispatch(dragEntityInSidebar(sourceIndex, destIndex));
  }
  else if (source === WORKSPACE_TYPE && destination === WORKSPACE_TYPE) {
    dispatch(dragEntityInWorkspace(sourceIndex, destIndex));
  }
  else console.log(result);
};
