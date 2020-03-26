import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Grommet, ThemeType } from 'grommet';
import Sidebar from '../sidebar/sidebar';
import Workspace from '../workspace/workspace';

const theme: ThemeType = {
  global: {
    font: {
      family: 'Raleway',
      size: '1.2em',
      height: '2em',
    },
  },
};

const AppComponent = (): ReactElement => (
  <Grommet full theme={theme}>
    <Sidebar />
    <Workspace />
  </Grommet>
);

const App = connect(null, null)(AppComponent);

export default App;
