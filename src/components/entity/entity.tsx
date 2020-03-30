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
import { selectFieldsFromChildren, selectChildEntities, selectChildren } from '../../selectors/entities';
import { selectFieldsLoadStatus, selectFieldsLoadMessage } from '../../selectors/fields';
import { apiFieldsFetch } from '../../store/api/fields/services';
import Field from '../field/field';
import { createKey, createDraggableId, createDroppableId } from '../../utils/methods';
import { WORKSPACE_TYPE } from '../../utils/constants';
import { dragEntityFromWorkspaceToSidebar } from '../../store/drag/basic/dispatchers';
import { renderConfig } from '../../utils/elements';
import { modalConfigOpen } from '../../store/modal/dispatchers';
import { EntityType, Child } from '../../models/app/entities';

type StoreProps = {
  children: Child[];
  fields: FieldType[];
  entities: EntityType[];
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

const renderField = (
  child: Child,
  index: number,
  fields: FieldType[],
): ReactElement => {
  const thisField = fields.filter((field) => (field.name === child.name))[0];
  const { name, type, actualParent } = thisField;
  return (
    <Field
      name={name}
      type={type}
      index={index}
      fullName={createKey(actualParent, name)}
      key={createKey(actualParent, name)}
    />
  );
};

const renderEntity = (
  child: Child,
  index: number,
  entities: EntityType[],
  showConfig?: boolean,
): ReactElement => {
  const thisEntity = entities.filter((entity) => (entity.name === child.name))[0];
  const { name, parentName } = thisEntity;
  return (
    <Entity
      name={name}
      parent={parentName}
      key={name}
      index={index}
      showConfig={showConfig}
    />
  );
};

const renderChildren = (
  name: string,
  status: LoadStatus,
  children: Child[],
  fields: FieldType[],
  entities: EntityType[],
  message: string,
  clickHandler: Function,
  showConfig?: boolean,
): ReactElement => {
  if (status === 'SUCCESS') {
    return (
      <Droppable droppableId={createDroppableId(name)} direction="vertical">
        {
          (provided: DroppableProvided): ReactElement => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              direction={showConfig ? 'row' : 'column'}
              justify="center"
              align="center"
            >
              {
                children.map((child, index): ReactElement | null => {
                  if (child.type === 'FIELD') {
                    return renderField(child, index, fields);
                  }
                  if (child.type === 'ENTITY') {
                    return renderEntity(child, index, entities, showConfig);
                  }
                  return null;
                })
              }
              { provided.placeholder }
            </Box>
          )
        }
      </Droppable>
    );
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
  children,
  fields,
  entities,
  loadMessage,
  loadStatus,
  index,
  showConfig,
  removeFromWorkspace,
  showConfigMenu,
}: Props): ReactElement => (
  <Draggable draggableId={createDraggableId(name, 'ENTITY')} index={index} isDragDisabled={loadStatus !== 'SUCCESS'}>
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
          width={showConfig ? 'auto' : 'small'}
          direction="column"
        >
          <Heading
            level={3}
            margin="xsmall"
            textAlign="center"
          >
            { name }
          </Heading>
          {
            renderChildren(name,
              loadStatus,
              children,
              fields,
              entities,
              loadMessage,
              clickHandler,
              showConfig)
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
  children: selectChildren(state, ownProps.name),
  fields: selectFieldsFromChildren(state, ownProps.name),
  entities: selectChildEntities(state, ownProps.name),
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
  showConfigMenu: (): void => {
    if (ownProps.parent === WORKSPACE_TYPE) {
      dispatch(modalConfigOpen(ownProps.name));
    }
    else {
      console.log('unsupported');
    }
  },
});

const Entity = connect(mapStateToProps, mapDispatchToProps)(EntityComponent);

export default Entity;
