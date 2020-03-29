import { ChildType } from '../models/utils/utils';

export const createKey = (parentName: string, fieldName: string): string => (`${parentName}.${fieldName}`);

const childValues: ChildType[] = ['ENTITY', 'FIELD'];

const getNumber = (type: ChildType): number => (childValues.indexOf(type));
const getChildType = (index: number): ChildType => (childValues[index]);

export const createDraggableId = (name: string, type: ChildType): string => (`${getNumber(type)}${name}`);
export const getDraggableName = (id: string): string => id.slice(1);
export const getDraggableType = (id: string): ChildType => getChildType(parseInt(id[0], 10));

export const createDroppableId = (name: string): string => (`${name}`);
export const getDroppable = (id: string): string => (id);

export const getEntityFromRelation = (relationName: string): string => relationName;
