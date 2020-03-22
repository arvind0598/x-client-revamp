import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';
import { apiDatabaseFetch } from '../../store/api/database/dispatchers';

type StoreProps = {
  name: string;
};

type DispatchProps = {
  clickHandler: Function;
}

type Props = StoreProps & DispatchProps;

const AppComponent = ({ name, clickHandler }: Props): ReactElement => (
  <div>
    <p>Hello { name }</p>
    <button type="button" onClick={(): void => clickHandler()}> Fetch </button>
  </div>
);

const mapStateToProps = ({ datasourceData }: StoreType): StoreProps => ({
  name: JSON.stringify(datasourceData),
});

const mapDispatchToProps = (dispatch) => ({
  clickHandler: () => dispatch(apiDatabaseFetch()),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
