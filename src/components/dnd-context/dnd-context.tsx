import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import App from '../app/app';
import { handleDragEnd } from '../../store/drag/services';

type DispatchProps = {
  dragEndHandler: Function;
}

type Props = DispatchProps;

const DndContextComponent = ({ dragEndHandler }: Props): ReactElement => (
  <DragDropContext onDragEnd={(result: DropResult): void => dragEndHandler(result)}>
    <App />
  </DragDropContext>
);

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  dragEndHandler: (result: DropResult): void => dispatch(handleDragEnd(result)),
});

const DndContext = connect(null, mapDispatchToProps)(DndContextComponent);

export default DndContext;
