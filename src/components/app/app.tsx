import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';

type StoreProps = {
  name: string;
};

type Props = StoreProps;

const AppComponent = ({ name }: Props): ReactElement => (
  <p>Hello { name }</p>
);

const mapStateToProps = ({ datasourceData }: StoreType): Props => ({
  name: JSON.stringify(datasourceData),
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
