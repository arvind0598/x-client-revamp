import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  Layer,
  Box,
  Button,
  Text,
} from 'grommet';
import { StoreType } from '../../../models/app/store';
import { modalNewDbClose } from '../../../store/modal/dispatchers';
import { apiResponseFetch } from '../../../store/api/response/services';
import { LoadStatus } from '../../../models/utils/utils';

type StoreProps = {
  isOpen: boolean;
  loadStatus: LoadStatus;
  responseMessage?: string;
};

type DispatchProps = {
  closeLayer: Function;
  clickHandler: Function;
};

type Props = StoreProps & DispatchProps;

const NewDbModalComponent = ({
  isOpen,
  closeLayer,
  clickHandler,
  loadStatus,
}: Props): ReactElement | null => {
  const renderData = (): ReactElement => {
    if (loadStatus === 'SUCCESS') {
      return (
        <Text>
          Success. You can now select this database from the dropdown.
        </Text>
      );
    }

    return (
      <Button
        primary
        label="Add new Database"
        disabled={loadStatus === 'LOADING'}
        onClick={(): void => clickHandler()}
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
  isOpen: state.modalData.isOpen && state.modalData.type === 'NEWDB',
  loadStatus: state.modalData.status,
  responseMessage: state.modalData.response,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalNewDbClose()),
  clickHandler: (store: StoreType): void => dispatch(apiResponseFetch(store)),
});

const NewDbModal = connect(mapStateToProps, mapDispatchToProps)(NewDbModalComponent);

export default NewDbModal;
