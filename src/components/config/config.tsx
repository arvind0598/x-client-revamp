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
import { modalConfigClose, fieldToggle } from '../../store/modal/dispatchers';
import { FieldType } from '../../models/app/fields';
import { selectFieldsFromChildren } from '../../selectors/fields';

type StoreProps = {
  isOpen: boolean;
  entityName: string;
  fields: FieldType[];
};

type DispatchProps = {
  closeLayer: Function;
  toggleField: Function;
};

type Props = StoreProps & DispatchProps;

const ConfigComponent = ({
  isOpen,
  closeLayer,
  toggleField,
  entityName,
  fields,
}: Props): ReactElement | null => {
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
                <Select
                  options={['<', '>', '=', '<=', '>=']}
                />
              </TableCell>
              <TableCell>
                <TextInput />
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
  isOpen: state.modalData.isOpen,
  entityName: state.modalData.entityName,
  fields: getChildrenFields(state, state.modalData.entityName),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalConfigClose()),
  toggleField: (
    entityName: string,
    fieldName: string,
  ): void => dispatch(fieldToggle(entityName, fieldName)),
});

const Config = connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);

export default Config;
