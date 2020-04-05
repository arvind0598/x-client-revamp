export type FieldType = {
  name: string;
  type: string;
  currentParent: string;
  actualParent: string;
  selected: boolean;
};

export type FieldsSliceType = {
  fields: FieldType[];
};
