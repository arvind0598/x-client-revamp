import React, { ReactElement } from 'react';
import { Button } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { connect } from 'react-redux';
import { modalMainOpen } from '../../../store/modal/dispatchers';
import { StoreType } from '../../../models/app/store';
import { selectWorkspaceEntityNames } from '../../../selectors/entities';
import { FieldType } from '../../../models/app/fields';

type StoreProps = {
  isButtonEnabled: boolean;
};

type DispatchProps = {
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps;

const GenerateButtonComponent = ({
  clickHandler,
  isButtonEnabled,
}: Props): ReactElement => (
  <Button
    primary
    margin="small"
    size="large"
    gap="large"
    icon={<LinkNext />}
    disabled={!isButtonEnabled}
    onClick={(): void => clickHandler()}
  />
);

const someFieldsInvalid = (fields: FieldType[]): boolean => (
  fields.some((field) => (!!field.operation && !field.value))
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  isButtonEnabled: selectWorkspaceEntityNames(state).length > 0
    && !someFieldsInvalid(state.fieldsData.fields),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (): void => dispatch(modalMainOpen()),
});

const GenerateButton = connect(mapStateToProps, mapDispatchToProps)(GenerateButtonComponent);

export default GenerateButton;
