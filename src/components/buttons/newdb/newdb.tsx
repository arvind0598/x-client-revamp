import React, { ReactElement } from 'react';
import { Button } from 'grommet';
import { Add } from 'grommet-icons';
import { connect } from 'react-redux';
import { modalMainOpen } from '../../../store/modal/dispatchers';

type DispatchProps = {
  clickHandler: Function;
};

type Props = DispatchProps;

const NewDatabaseButtonComponent = ({
  clickHandler,
}: Props): ReactElement => (
  <Button
    primary
    margin="small"
    size="large"
    color="status-ok"
    icon={<Add />}
    onClick={(): void => clickHandler()}
  />
);

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (): void => dispatch(modalMainOpen()),
});

const NewDatabaseButton = connect(null, mapDispatchToProps)(NewDatabaseButtonComponent);

export default NewDatabaseButton;
