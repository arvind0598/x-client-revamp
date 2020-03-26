import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { StoreType } from '../../models/app/store';
import { selectEntityNames } from '../../selectors/entities';

type StoreProps = {
  entityNames: string[];
  fieldNames: string[];
};

type DispatchProps = {

};

type Props = StoreProps & DispatchProps;

const renderEntityName = (entityName: string): ReactElement => (
  <Box
    background="light-1"
    elevation="small"
    height="xxsmall"
    margin="small"
    pad="small"
    justify="center"
    align="center"
  >
    {entityName}
  </Box>
);

const WorkspaceComponent = ({ entityNames }: Props): ReactElement => (
  <Box
    background="light-2"
    direction="row"
    elevation="xsmall"
    fill="horizontal"
    height="medium"
  >
    {
      entityNames.map((entityName) => renderEntityName(entityName))
    }
  </Box>
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  entityNames: selectEntityNames(state),
  fieldNames: [],
});

const Workspace = connect(mapStateToProps, null)(WorkspaceComponent);

export default Workspace;
