export type FieldType = {
  name: string;
  type: string;
  currentParent: string;
  actualParent: string;
  selected: boolean;
  operation?: string;
  value?: string;
};

export type FieldsSliceType = {
  fields: FieldType[];
};
