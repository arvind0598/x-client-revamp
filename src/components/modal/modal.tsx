import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import { Layer, Box, Button } from 'grommet';
import { StoreType } from '../../models/app/store';
import { modalMainClose } from '../../store/modal/dispatchers';
import { apiResponseFetch } from '../../store/api/response/services';

type StoreProps = {
  isOpen: boolean;
  theEntireState: StoreType;
};

type DispatchProps = {
  closeLayer: Function;
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps;

const ModalComponent = ({
  isOpen,
  closeLayer,
  clickHandler,
  theEntireState,
}: Props): ReactElement | null => {
  const renderSomething = (): ReactElement => (
    <Button
      primary
      label="Generate API"
      onClick={(): void => clickHandler(theEntireState)}
    />
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
  theEntireState: state,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalMainClose()),
  clickHandler: (store: StoreType): void => dispatch(apiResponseFetch(store)),
});

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);

export default Modal;
