import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Layer,
  Box,
  Heading,
  CheckBox,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Select,
  TextInput,
} from 'grommet';
import { StoreType } from '../../models/app/store';
import {
  modalConfigClose,
  fieldToggle,
  fieldSetOperation,
  fieldClearOperation,
  fieldSetValue,
} from '../../store/modal/dispatchers';
import { FieldType } from '../../models/app/fields';
import { selectFieldsFromChildren } from '../../selectors/fields';
import { OperationType } from '../../models/utils/utils';
import { OPERATION_VALUES } from '../../utils/constants';

type StoreProps = {
  isOpen: boolean;
  entityName: string;
  fields: FieldType[];
};

type DispatchProps = {
  closeLayer: Function;
  toggleField: Function;
  changeFieldOperation: Function;
  changeFieldValue: Function;
};

type Props = StoreProps & DispatchProps;

const ConfigComponent = ({
  isOpen,
  closeLayer,
  toggleField,
  changeFieldOperation,
  changeFieldValue,
  entityName,
  fields,
}: Props): ReactElement | null => {
  const renderOperationSelectInput = (
    fieldName: string,
    operation: string | undefined,
  ): ReactElement => (
    <Select
      value={operation || 'None'}
      options={['None', ...OPERATION_VALUES]}
      onChange={(event): void => changeFieldOperation(entityName, fieldName, event.option)}
    />
  );

  const renderValueTextInput = (
    fieldName: string,
    type: string,
    value: string | undefined,
    hasOperation: boolean,
  ): ReactElement => (
    <TextInput
      disabled={!hasOperation}
      value={value}
      onChange={(event): void => changeFieldValue(entityName, fieldName, event.target.value)}
    />
  );

  const renderFields = (): ReactElement => (
    <Table margin="large">
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom"> Name </TableCell>
          <TableCell scope="col" border="bottom"> Type </TableCell>
          <TableCell scope="col" border="bottom"> Operation </TableCell>
          <TableCell scope="col" border="bottom"> Value </TableCell>
          <TableCell scope="col" border="bottom"> Enabled </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          fields.map((field) => (
            <TableRow
              key={`${field.currentParent}.${field.name}`}
            >
              <TableCell scope="row">{field.name}</TableCell>
              <TableCell>{field.type.toLocaleLowerCase()}</TableCell>
              <TableCell>
                {
                  renderOperationSelectInput(field.name, field.operation)
                }
              </TableCell>
              <TableCell>
                {
                  renderValueTextInput(field.name, field.type, field.value, !!field.operation)
                }
              </TableCell>
              <TableCell>
                <CheckBox
                  checked={field.selected}
                  onChange={(): void => toggleField(entityName, field.name)}
                />
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );

  return (
    isOpen
      ? (
        <Layer
          animation="fadeIn"
          onClickOutside={(): void => closeLayer()}
          onEsc={(): void => closeLayer()}
        >
          <Box
            pad="large"
          >
            <Heading
              alignSelf="center"
              level="3"
              margin="small"
              textAlign="center"
            >
              {entityName}
            </Heading>

            {renderFields()}
          </Box>
        </Layer>
      )
      : null
  );
};

const getChildrenFields = (state: StoreType, entityName: string): FieldType[] => (
  entityName ? selectFieldsFromChildren(state, entityName) : []
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  isOpen: state.modalData.isOpen && !!state.modalData.entityName,
  entityName: state.modalData.entityName,
  fields: getChildrenFields(state, state.modalData.entityName),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalConfigClose()),

  toggleField: (
    entityName: string,
    fieldName: string,
  ): void => dispatch(fieldToggle(entityName, fieldName)),

  changeFieldOperation: (
    entityName: string,
    fieldName: string,
    operation: string,
  ): void => {
    if (operation !== 'None') dispatch(fieldSetOperation(entityName, fieldName, operation as OperationType));
    else dispatch(fieldClearOperation(entityName, fieldName));
  },

  changeFieldValue: (
    entityName: string,
    fieldName: string,
    value: string,
  ): void => dispatch(fieldSetValue(entityName, fieldName, value)),
});

const Config = connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);

export default Config;
