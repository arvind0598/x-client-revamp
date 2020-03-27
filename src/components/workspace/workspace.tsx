import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { StoreType } from '../../models/app/store';
import { selectEntityNames, selectWorkspaceEntityNames } from '../../selectors/entities';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
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
    <Entity name={name} key={name} index={index} />
  ))
);

const WorkspaceComponent = ({ entityNames }: Props): ReactElement => (
  <Droppable droppableId={WORKSPACE_TYPE}>
    {
      (provided: DroppableProvided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          background="light-2"
          direction="row"
          elevation="xsmall"
          fill="vertical"
          width="50%"
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
