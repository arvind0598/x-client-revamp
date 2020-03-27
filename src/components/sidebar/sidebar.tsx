import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Select,
  Button,
  Text,
} from 'grommet';

import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { StoreType } from '../../models/app/store';
import { apiEntitiesFetchAfterChoose } from '../../store/api/entities/services';
import { LoadStatus } from '../../models/utils/utils';
import Entity from '../entity/entity';
import {
  selectEntityLoadStatus, selectEntitiesLoadMessage, selectSidebarEntityNames,
} from '../../selectors/entities';
import { selectDatasourceNames } from '../../selectors/datasources';
import { SIDEBAR_TYPE } from '../../utils/constants';

type StoreProps = {
  datasources: string[];
  entityNames: string[];
  entitiesLoadStatus: LoadStatus;
  entitiesLoadMessage: string;
};

type DispatchProps = {
  clickHandler: Function;
}

type Props = StoreProps & DispatchProps;

const SidebarComponent = ({
  datasources,
  entityNames,
  entitiesLoadStatus,
  entitiesLoadMessage,
  clickHandler,
}: Props): ReactElement => {
  const [datasource, setDatasource] = useState('');
  const [fetchStatus, setFetchStatus] = useState(false);

  const changeHandler = (option: string): void => {
    const selectedSource = option;
    setDatasource(selectedSource);
    setFetchStatus(true);
  };

  const renderEntities = (names: string[]): ReactElement[] => (
    names.map((name, index) => (
      <Entity name={name} key={name} index={index} />
    ))
  );

  const renderChildren = (status: LoadStatus, names: string[], message: string): ReactElement => {
    if (status === 'SUCCESS') {
      return (
        <Droppable droppableId={SIDEBAR_TYPE} direction="horizontal">
          {
            (provided: DroppableProvided): ReactElement => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                fill="horizontal"
                height="80%"
                direction="row"
                align="start"
                justify="center"
              >
                { renderEntities(names) }
                { provided.placeholder }
              </Box>
            )
          }
        </Droppable>
      );
    }

    return (
      <Text textAlign="center">{ message }</Text>
    );
  };

  return (
    <Box
      fill="vertical"
      direction="column"
      width="40%"
      align="center"
      justify="center"
      wrap
    >
      <Box
        height="20%"
        align="center"
        justify="center"
      >
        <Select
          onChange={({ option }): void => changeHandler(option)}
          emptySearchMessage="There are no databases configured."
          options={datasources}
        />
        <Button
          primary
          disabled={!fetchStatus}
          size="large"
          label="Fetch"
          margin="small"
          onClick={(): void => clickHandler(datasource)}
        />
      </Box>

      {
        renderChildren(entitiesLoadStatus, entityNames, entitiesLoadMessage)
      }
    </Box>
  );
};

const mapStateToProps = (state: StoreType): StoreProps => ({
  datasources: selectDatasourceNames(state),
  entitiesLoadStatus: selectEntityLoadStatus(state),
  entitiesLoadMessage: selectEntitiesLoadMessage(state),
  entityNames: selectSidebarEntityNames(state),
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (name: string): void => {
    if (name !== '') dispatch(apiEntitiesFetchAfterChoose(name));
  },
});

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);

export default Sidebar;
