import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

type StoreProps = {
};

type OwnProps = {
  name: string;
}

type Props = StoreProps & OwnProps;

const EntityComponent = ({ name }: Props): ReactElement => (
  <p>{ name }</p>
);

const Entity = connect(null, null)(EntityComponent);

export default Entity;
