import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { FieldType } from '../../models/app/fields';
import { LoadStatus } from '../../models/utils/utils';
import { StoreType } from '../../models/app/store';
import { selectFieldsFromChildren } from '../../selectors/entities';
import { selectFieldsLoadStatus, selectFieldsLoadMessage } from '../../selectors/fields';
import { apiFieldsFetch } from '../../store/api/fields/services';
import Field from '../field/field';

type StoreProps = {
  fields: FieldType[];
  loadStatus: LoadStatus;
  loadMessage: string;
};

type OwnProps = {
  name: string;
};

type DispatchProps = {
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps & OwnProps;

const renderFields = (fields: FieldType[]): ReactElement => (
  <div>
    {
      fields.map(({ name, type }) => (
        <Field name={name} type={type} />
      ))
    }
  </div>
);

// eslint-disable-next-line max-len
const renderChildren = (status: LoadStatus, fields: FieldType[], message: string, clickHandler: Function): ReactElement => {
  if (status === 'SUCCESS') {
    return (
      <div>
        { renderFields(fields) }
      </div>
    );
  }

  return (
    <div>
      <p>{ message }</p>
      <button type="button" onClick={(): void => clickHandler()}> Get Fields </button>
    </div>
  );
};

const EntityComponent = ({
  name,
  clickHandler,
  fields,
  loadMessage,
  loadStatus,
}: Props): ReactElement => (
  <div>
    <p>{ name }</p>
    {
      renderChildren(loadStatus, fields, loadMessage, clickHandler)
    }
  </div>
);

const mapStateToProps = (state: StoreType, ownProps: Props): StoreProps => ({
  fields: selectFieldsFromChildren(state, ownProps.name),
  loadStatus: selectFieldsLoadStatus(state, ownProps.name),
  loadMessage: selectFieldsLoadMessage(state, ownProps.name),
});

const mapDispatchToProps = (dispatch: Function, ownProps: Props): DispatchProps => ({
  clickHandler: (): void => dispatch(apiFieldsFetch(ownProps.name)),
});

const Entity = connect(mapStateToProps, mapDispatchToProps)(EntityComponent);

export default Entity;
