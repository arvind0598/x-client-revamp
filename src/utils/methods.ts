export const createKey = (parentName: string, fieldName: string): string => (`${parentName}.${fieldName}`);

export const createDraggableId = (name: string): string => (`${name}`);
export const getDraggable = (id: string): string => (id);

export const createDroppableId = (name: string): string => (`${name}`);
export const getDroppable = (id: string): string => (id);

export const getEntityFromRelation = (relationName: string): string => relationName;
