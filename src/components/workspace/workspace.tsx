import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';
import { selectEntityNames } from '../../selectors/entities';

type StoreProps = {
  entityNames: string[];
  fieldNames: string[];
};

type DispatchProps = {

};

type Props = StoreProps & DispatchProps;

const WorkspaceComponent = ({ entityNames }: Props): ReactElement => (
  <div>
    <p> Workspace </p>
    <p>{ JSON.stringify(entityNames) }</p>
  </div>
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  entityNames: selectEntityNames(state),
  fieldNames: [],
});

const Workspace = connect(mapStateToProps, null)(WorkspaceComponent);

export default Workspace;
