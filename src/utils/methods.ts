export const createKey = (parentName: string, fieldName: string): string => (`${parentName}.${fieldName}`);

export const createDraggableId = (name: string): string => (`DRAG!${name}`);

export const createDroppableId = (name: string): string => (`DROP!${name}`);
