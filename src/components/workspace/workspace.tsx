import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';
import { selectEntityNames } from '../../selectors/entities';
import { Box } from 'grommet';

type StoreProps = {
  entityNames: string[];
  fieldNames: string[];
};

type DispatchProps = {

};

type Props = StoreProps & DispatchProps;

const WorkspaceComponent = ({ entityNames }: Props): ReactElement => (
  <Box
    background="light-1"
    direction="row"
    elevation="xsmall"
    fill="horizontal"
    height="medium"
  >
    <p> Workspace </p>
    <p>{ JSON.stringify(entityNames) }</p>
  </Box>
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  entityNames: selectEntityNames(state),
  fieldNames: [],
});

const Workspace = connect(mapStateToProps, null)(WorkspaceComponent);

export default Workspace;
