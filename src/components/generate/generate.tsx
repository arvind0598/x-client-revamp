import React, { ReactElement } from 'react';
import { Button } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { connect } from 'react-redux';
import { modalMainOpen } from '../../store/modal/dispatchers';

type DispatchProps = {
  clickHandler: Function;
};

type Props = DispatchProps;

const GenerateButtonComponent = ({
  clickHandler,
}: Props): ReactElement => (
  <Button
    primary
    margin="small"
    size="large"
    gap="large"
    icon={<LinkNext />}
    onClick={(): void => clickHandler()}
  />
);

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (): void => dispatch(modalMainOpen()),
});

const GenerateButton = connect(null, mapDispatchToProps)(GenerateButtonComponent);

export default GenerateButton;
