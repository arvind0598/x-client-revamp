import { connect } from 'react-redux';
import React, { ReactElement } from 'react';
import { Box, Text } from 'grommet';

type OwnProps = {
  name: string;
  type: string;
  fullName: string;
  index: number;
  hasError: boolean;
};

type Props = OwnProps;

const FieldComponent = ({
  name,
  type,
  hasError,
}: Props): ReactElement => (
  <Box
    background={hasError ? 'status-error' : 'light-2'}
    elevation="small"
    margin="xsmall"
    pad="medium"
    justify="center"
    align="center"
    direction="column"
  >
    <Text textAlign="center">{ name }</Text>
    <Text textAlign="center">{ type }</Text>
  </Box>
);

const Field = connect(null, null)(FieldComponent);

export default Field;
