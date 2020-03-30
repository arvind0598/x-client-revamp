import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { StoreType } from '../../models/app/store';
import { selectWorkspaceEntityNames } from '../../selectors/entities';
import { WORKSPACE_TYPE } from '../../utils/constants';
import Entity from '../entity/entity';

type StoreProps = {
  entityNames: string[];
  fieldNames: string[];
};

type DispatchProps = {

};

type Props = StoreProps & DispatchProps;

const renderEntities = (entityNames: string[]): ReactElement[] => (
  entityNames.map((name, index) => (
    <Entity
      showConfig
      parent={WORKSPACE_TYPE}
      name={name}
      key={name}
      index={index}
    />
  ))
);

const WorkspaceComponent = ({ entityNames }: Props): ReactElement => (
  <Droppable droppableId={WORKSPACE_TYPE} direction="horizontal">
    {
      (provided: DroppableProvided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          background="light-2"
          direction="row"
          elevation="xsmall"
          fill="vertical"
          justify="start"
          align="start"
          width="60%"
          overflow="auto"
        >
          {
            renderEntities(entityNames)
          }
          { provided.placeholder }
        </Box>
      )
    }
  </Droppable>

);

const mapStateToProps = (state: StoreType): StoreProps => ({
  entityNames: selectWorkspaceEntityNames(state),
  fieldNames: [],
});

const Workspace = connect(mapStateToProps, null)(WorkspaceComponent);

export default Workspace;
