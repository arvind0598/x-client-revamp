import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  Button,
} from 'grommet';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

import { FieldType } from '../../models/app/fields';
import { LoadStatus } from '../../models/utils/utils';
import { StoreType } from '../../models/app/store';
import { selectFieldsFromChildren } from '../../selectors/entities';
import { selectFieldsLoadStatus, selectFieldsLoadMessage } from '../../selectors/fields';
import { apiFieldsFetch } from '../../store/api/fields/services';
import Field from '../field/field';
import { createKey, createDraggableId } from '../../utils/methods';

type StoreProps = {
  fields: FieldType[];
  loadStatus: LoadStatus;
  loadMessage: string;
};

type OwnProps = {
  name: string;
  index: number;
};

type DispatchProps = {
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps & OwnProps;

const renderFields = (fields: FieldType[], parentName: string): ReactElement => (
  <Box
    direction="column"
    justify="center"
    align="center"
  >
    {
      fields.map(({ name, type }) => (
        <Field name={name} type={type} key={createKey(parentName, name)} />
      ))
    }
  </Box>
);

// eslint-disable-next-line max-len
const renderChildren = (name: string, status: LoadStatus, fields: FieldType[], message: string, clickHandler: Function): ReactElement => {
  if (status === 'SUCCESS') {
    return renderFields(fields, name);
  }

  return (
    <>
      <Text textAlign="center">{ message }</Text>
      <Button
        primary
        size="medium"
        label="Get Fields"
        margin="small"
        onClick={(): void => clickHandler()}
      />
    </>
  );
};

const EntityComponent = ({
  name,
  clickHandler,
  fields,
  loadMessage,
  loadStatus,
  index,
}: Props): ReactElement => (
  <Draggable draggableId={createDraggableId(name)} index={index} isDragDisabled={loadStatus !== 'SUCCESS'}>
    {
      (provided: DraggableProvided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          background="light-1"
          elevation="small"
          margin="small"
          pad="small"
          justify="center"
          align="center"
          width="small"
        >
          <Heading
            level={3}
            margin="xsmall"
            textAlign="center"
          >
            { name }
          </Heading>
          {
            renderChildren(name, loadStatus, fields, loadMessage, clickHandler)
          }
        </Box>
      )
    }
  </Draggable>

);

const mapStateToProps = (state: StoreType, ownProps: Props): StoreProps => ({
  fields: selectFieldsFromChildren(state, ownProps.name),
  loadStatus: selectFieldsLoadStatus(state, ownProps.name),
  loadMessage: selectFieldsLoadMessage(state, ownProps.name),
});

const mapDispatchToProps = (dispatch: Function, ownProps: Props): DispatchProps => ({
  clickHandler: (): void => dispatch(apiFieldsFetch(ownProps.name)),
});

const Entity = connect(mapStateToProps, mapDispatchToProps)(EntityComponent);

export default Entity;
