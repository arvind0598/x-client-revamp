import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import { Layer, Box } from 'grommet';
import { StoreType } from '../../models/app/store';
import { modalMainClose } from '../../store/modal/dispatchers';

type StoreProps = {
  isOpen: boolean;
};

type DispatchProps = {
  closeLayer: Function;
};

type Props = StoreProps & DispatchProps;

const ModalComponent = ({ isOpen, closeLayer }: Props): ReactElement | null => {
  const renderSomething = (): ReactElement => (
    <p> Confirm here. </p>
  );

  return (
    isOpen
      ? (
        <Layer
          animation="fadeIn"
          onClickOutside={(): void => closeLayer()}
          onEsc={(): void => closeLayer()}
        >
          <Box
            pad="large"
          >
            {
              renderSomething()
            }
          </Box>
        </Layer>
      )
      : null
  );
};

const mapStateToProps = (state: StoreType): StoreProps => ({
  isOpen: state.modalData.isOpen && !state.modalData.entityName,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalMainClose()),
});

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);

export default Modal;
