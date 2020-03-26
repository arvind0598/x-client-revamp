import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/sidebar';
import Workspace from '../workspace/workspace';

const AppComponent = (): ReactElement => (
  <>
    <Sidebar />
    <Workspace />
  </>
);

const App = connect(null, null)(AppComponent);

export default App;
