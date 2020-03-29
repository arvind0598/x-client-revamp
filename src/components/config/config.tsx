import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Layer, Box } from 'grommet';
import { StoreType } from '../../models/app/store';
import { modalConfigClose } from '../../store/modal/dispatchers';

type StoreProps = {
  isOpen: boolean;
};

type DispatchProps = {
  closeLayer: Function;
};

type Props = StoreProps & DispatchProps;

const ConfigComponent = ({
  isOpen,
  closeLayer,
}: Props): ReactElement | null => (
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
          Hello!
        </Box>
      </Layer>
    )
    : null
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  isOpen: state.modalData.isOpen,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalConfigClose()),
});

const Config = connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);

export default Config;
