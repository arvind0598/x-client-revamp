import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import {
  Layer,
  Box,
  Button,
  Text,
  TextInput,
  Heading,
} from 'grommet';
import { StoreType } from '../../../models/app/store';
import { modalNewDbClose } from '../../../store/modal/dispatchers';
import { LoadStatus } from '../../../models/utils/utils';
import { apiAddSourceFetch } from '../../../store/api/addsource/services';

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
  responseMessage,
}: Props): ReactElement | null => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const renderData = (): ReactElement => {
    if (loadStatus === 'SUCCESS') {
      return (
        <Text textAlign="center">
          Success. You can now select this database from the dropdown.
        </Text>
      );
    }

    if (loadStatus === 'INIT' && !!responseMessage) {
      return (
        <Text textAlign="center">
          { responseMessage }
        </Text>
      );
    }

    return (
      <>
        <Heading level="3" textAlign="center">
          Add New Datasource
        </Heading>
        <Box margin="xsmall">
          <TextInput
            placeholder="Database Name"
            size="small"
            value={name}
            onChange={(event): void => setName(event.target.value)}
          />
        </Box>
        <Box margin="xsmall">
          <TextInput
            placeholder="Database URL"
            size="small"
            value={url}
            onChange={(event): void => setUrl(event.target.value)}
          />
        </Box>
        <Button
          primary
          size="medium"
          margin="small"
          label="Add new Database"
          disabled={loadStatus === 'LOADING' || !name.length || !url.length}
          onClick={(): void => clickHandler(name, url)}
        />
      </>
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
            margin=""
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
  clickHandler: (name: string, url: string): void => dispatch(apiAddSourceFetch(name, url)),
});

const NewDbModal = connect(mapStateToProps, mapDispatchToProps)(NewDbModalComponent);

export default NewDbModal;
