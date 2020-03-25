import { connect } from 'react-redux';
import React, { ReactElement } from 'react';

type OwnProps = {
  name: string;
  type: string;
};

type Props = OwnProps;

const FieldComponent = ({ name, type }: Props): ReactElement => (
  <div>
    <p>{ name }</p>
    <p>{ type }</p>
  </div>
);

const Field = connect(null, null)(FieldComponent);

export default Field;
