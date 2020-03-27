export const DRAG_ENTITY_IN_SIDEBAR = 'DRAG_ENTITY_IN_SIDEBAR';
export const DRAG_ENTITY_IN_WORKSPACE = 'DRAG_ENTITY_IN_WORKSPACE';

export const DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE = 'DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE';
export const DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR = 'DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR';

export type BasicDragEntitiesActionType = 'DRAG_ENTITY_IN_SIDEBAR' | 'DRAG_ENTITY_IN_WORKSPACE' | 'DRAG_ENTITY_FROM_SIDEBAR_TO_WORKSPACE' | 'DRAG_ENTITY_FROM_WORKSPACE_TO_SIDEBAR';

export const DRAG_ENTITY_BETWEEN_ENTITIES = 'DRAG_ENTITY_TO_ENTITY';

export const DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR = 'DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR';
export const DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY = 'DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY';

export const DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE = 'DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE';
export const DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY = 'DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY';

export type NestedDragEntitiesActionType = 'DRAG_ENTITY_TO_ENTITY' | 'DRAG_ENTITY_FROM_ENTITY_TO_SIDEBAR' | 'DRAG_ENTITY_FROM_SIDEBAR_TO_ENTITY' | 'DRAG_ENTITY_FROM_ENTITY_TO_WORKSPACE' | 'DRAG_ENTITY_FROM_WORKSPACE_TO_ENTITY';

export type DragEntitiesActionType = BasicDragEntitiesActionType & NestedDragEntitiesActionType;

export const DRAG_FIELD_IN_ENTITY = 'DRAG_FIELD_IN_ENTITY';
export const DRAG_FIELD_BETWEEN_ENTITIES = 'DRAG_FIELD_BETWEEN_ENTITIES';

export const DRAG_FIELD_FROM_ENTITY_TO_SIDEBAR = 'DRAG_FIELD_FROM_ENTITY_TO_SIDEBAR';

export const DRAG_FIELD_FROM_ENTITY_TO_WORKSPACE = 'DRAG_FIELD_FROM_ENTITY_TO_WORKSPACE';
export const DRAG_FIELD_FROM_WORKSPACE_TO_ENTITY = 'DRAG_FIELD_FROM_WORKSPACE_TO_ENTITY';
