import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Grommet,
  ThemeType,
  Box,
  Stack,
} from 'grommet';
import Sidebar from '../sidebar/sidebar';
import Workspace from '../workspace/workspace';
import Config from '../modals/config/config';
import GenerateButton from '../buttons/generate/generate';
import Modal from '../modals/modal/modal';
import NewDatabaseButton from '../buttons/newdb/newdb';

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
    <Stack fill anchor="bottom-right">
      <Box fill direction="row">
        <Sidebar />
        <Workspace />
      </Box>
      <Box direction="row">
        <NewDatabaseButton />
        <GenerateButton />
      </Box>
    </Stack>
    <Config />
    <Modal />
  </Grommet>
);

const App = connect(null, null)(AppComponent);

export default App;
