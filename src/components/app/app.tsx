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
import Config from '../config/config';
import GenerateButton from '../generate/generate';
import Modal from '../modal/modal';

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
      <GenerateButton />
    </Stack>
    <Config />
    <Modal />
  </Grommet>
);

const App = connect(null, null)(AppComponent);

export default App;
