import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Heading,
  Text,
  Button,
} from 'grommet';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';

import { FieldType } from '../../models/app/fields';
import { LoadStatus } from '../../models/utils/utils';
import { StoreType } from '../../models/app/store';
import { selectFieldsFromChildren } from '../../selectors/entities';
import { selectFieldsLoadStatus, selectFieldsLoadMessage } from '../../selectors/fields';
import { apiFieldsFetch } from '../../store/api/fields/services';
import Field from '../field/field';
import { createKey, createDraggableId, createDroppableId } from '../../utils/methods';
import { WORKSPACE_TYPE } from '../../utils/constants';
import { dragEntityFromWorkspaceToSidebar } from '../../store/drag/dispatchers';
import { renderConfig } from '../../utils/elements';

type StoreProps = {
  fields: FieldType[];
  loadStatus: LoadStatus;
  loadMessage: string;
};

type OwnProps = {
  name: string;
  parent: string;
  index: number;
  showConfig?: boolean;
};

type DispatchProps = {
  clickHandler: Function;
  removeFromWorkspace: Function;
  showConfigMenu: Function;
};

type Props = StoreProps & DispatchProps & OwnProps;

const renderFields = (fields: FieldType[], parentName: string): ReactElement => (
  <Droppable droppableId={createDroppableId(parentName)} direction="vertical">
    {
      (provided: DroppableProvided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          direction="column"
          justify="center"
          align="center"
        >
          {
            fields.map(({ name, type }, index) => (
              <Field
                name={name}
                type={type}
                index={index}
                fullName={createKey(parentName, name)}
                key={createKey(parentName, name)}
              />
            ))
          }
          { provided.placeholder }
        </Box>
      )
    }
  </Droppable>

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
  showConfig,
  removeFromWorkspace,
  showConfigMenu,
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
          {
            showConfig ? renderConfig(showConfigMenu, removeFromWorkspace) : null
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
  removeFromWorkspace: (): void => {
    if (ownProps.parent === WORKSPACE_TYPE) {
      dispatch(dragEntityFromWorkspaceToSidebar(ownProps.index, 0));
    }
    else {
      console.log('unsupported');
    }
  },
  showConfigMenu: (): void => console.log('unsupported'),
});

const Entity = connect(mapStateToProps, mapDispatchToProps)(EntityComponent);

export default Entity;
