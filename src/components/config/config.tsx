import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Layer, Box } from 'grommet';
import { StoreType } from '../../models/app/store';
import { modalConfigClose } from '../../store/modal/dispatchers';
import { FieldType } from '../../models/app/fields';
import { selectFieldsFromChildren } from '../../selectors/entities';

type StoreProps = {
  isOpen: boolean;
  entityName: string;
  fields: FieldType[];
};

type DispatchProps = {
  closeLayer: Function;
};

type Props = StoreProps & DispatchProps;

const ConfigComponent = ({
  isOpen,
  closeLayer,
  entityName,
  fields,
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
          Hello {entityName}!
          {JSON.stringify(fields)}
        </Box>
      </Layer>
    )
    : null
);

const getChildrenFields = (state: StoreType, entityName: string): FieldType[] => (
  entityName ? selectFieldsFromChildren(state, entityName) : []
);

const mapStateToProps = (state: StoreType): StoreProps => ({
  isOpen: state.modalData.isOpen,
  entityName: state.modalData.entityName,
  fields: getChildrenFields(state, state.modalData.entityName),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  closeLayer: (): void => dispatch(modalConfigClose()),
});

const Config = connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);

export default Config;
