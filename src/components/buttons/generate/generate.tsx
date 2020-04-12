import React, { ReactElement } from 'react';
import { Button } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { connect } from 'react-redux';
import { modalMainOpen } from '../../../store/modal/dispatchers';
import { StoreType } from '../../../models/app/store';
import { selectWorkspaceEntityNames } from '../../../selectors/entities';

type StoreProps = {
  hasWorkspaceEntities: boolean;
};

type DispatchProps = {
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps;

const GenerateButtonComponent = ({
  clickHandler,
  hasWorkspaceEntities,
}: Props): ReactElement => (
  <Button
    primary
    margin="small"
    size="large"
    gap="large"
    icon={<LinkNext />}
    disabled={!hasWorkspaceEntities}
    onClick={(): void => clickHandler()}
  />
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  hasWorkspaceEntities: selectWorkspaceEntityNames(state).length > 0,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (): void => dispatch(modalMainOpen()),
});

const GenerateButton = connect(mapStateToProps, mapDispatchToProps)(GenerateButtonComponent);

export default GenerateButton;
