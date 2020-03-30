import { BasicDragEntitiesActionType } from './basic/types';
import { NestedDragEntitiesActionType } from './nested/types';

export type DragEntitiesActionType = BasicDragEntitiesActionType & NestedDragEntitiesActionType;
