import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Layer,
  Box,
  Button,
  Text,
  Anchor,
} from 'grommet';
import { StoreType } from '../../../models/app/store';
import { modalMainClose } from '../../../store/modal/dispatchers';
import { apiResponseFetch } from '../../../store/api/response/services';
import { LoadStatus } from '../../../models/utils/utils';

type StoreProps = {
  isOpen: boolean;
  theEntireState: StoreType;
  loadStatus: LoadStatus;
  responseMessage?: string;
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
  loadStatus,
  responseMessage,
}: Props): ReactElement | null => {
  const renderData = (): ReactElement => {
    if (loadStatus === 'SUCCESS') {
      return (
        <Text>
          You can visit the API by clicking &nbsp;
          <Anchor
            href={responseMessage}
            target="_blank"
            label="here"
          />
          .
        </Text>
      );
    }

    return (
      <Button
        primary
        label="Generate API"
        disabled={loadStatus === 'LOADING'}
        onClick={(): void => clickHandler(theEntireState)}
      />
    );
  };

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
              renderData()
            }
          </Box>
        </Layer>
      )
      : null
  );
};

const mapStateToProps = (state: StoreType): StoreProps => ({
  isOpen: state.modalData.isOpen && state.modalData.type === 'MAIN',
  theEntireState: state,
  loadStatus: state.modalData.status,
  responseMessage: state.modalData.response,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalMainClose()),
  clickHandler: (store: StoreType): void => dispatch(apiResponseFetch(store)),
});

const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);

export default Modal;
