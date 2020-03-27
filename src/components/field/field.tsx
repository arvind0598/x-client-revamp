import { connect } from 'react-redux';
import React, { ReactElement } from 'react';
import { Box, Text } from 'grommet';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { createDraggableId } from '../../utils/methods';

type OwnProps = {
  name: string;
  type: string;
  fullName: string;
  index: number;
};

type Props = OwnProps;

const FieldComponent = ({
  name,
  type,
  fullName,
  index,
}: Props): ReactElement => (
  <Draggable draggableId={createDraggableId(fullName)} index={index}>
    {
      (provided: DraggableProvided): ReactElement => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          background="light-2"
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
      )
    }
  </Draggable>
);

const Field = connect(null, null)(FieldComponent);

export default Field;
