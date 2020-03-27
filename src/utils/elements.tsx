import React, { ReactElement } from 'react';
import { Box, Button } from 'grommet';
import { SettingsOption, FormClose } from 'grommet-icons';

// eslint-disable-next-line import/prefer-default-export
export const renderConfig = (configureHandler: Function, resetHandler: Function): ReactElement => (
  <Box
    align="center"
    justify="center"
    direction="row"
    gap="small"
    margin="small"
    animation="slideDown"
  >
    <Button
      primary
      gap="none"
      icon={<SettingsOption />}
      onClick={(): void => configureHandler()}
      size="small"
    />
    <Button
      primary
      color="status-unknown"
      gap="none"
      icon={<FormClose />}
      onClick={(): void => resetHandler()}
      size="small"
    />
  </Box>
);
