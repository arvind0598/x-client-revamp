import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Grommet, ThemeType, Box } from 'grommet';
import Sidebar from '../sidebar/sidebar';
import Workspace from '../workspace/workspace';
import Config from '../config/config';

const theme: ThemeType = {
  global: {
    font: {
      family: 'Raleway',
      size: '1em',
      height: '1.8em',
    },
  },
};

const AppComponent = (): ReactElement => (
  <Grommet full theme={theme}>
    <Box fill direction="row">
      <Sidebar />
      <Workspace />
    </Box>
    <Config />
  </Grommet>
);

const App = connect(null, null)(AppComponent);

export default App;
