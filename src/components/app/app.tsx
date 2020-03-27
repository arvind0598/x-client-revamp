import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Grommet, ThemeType, Box } from 'grommet';
import Sidebar from '../sidebar/sidebar';
import Workspace from '../workspace/workspace';

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
  </Grommet>
);

const App = connect(null, null)(AppComponent);

export default App;
