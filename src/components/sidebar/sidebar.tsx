import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';
import { apiEntitiesFetchAfterChoose } from '../../store/api/entities/dispatchers';
import { LoadStatus } from '../../models/utils/utils';
import Entity from '../entity/entity';

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

const createOption = (option: string, index: number): ReactElement => (
  <option key={index} value={option}>{ option }</option>
);

const SidebarComponent = ({
  datasources,
  entityNames,
  entitiesLoadStatus,
  entitiesLoadMessage,
  clickHandler,
}: Props): ReactElement => {
  const [datasource, setDatasource] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedSource = event.target.value;
    setDatasource(selectedSource);
  };

  const renderEntities = (names: string[]): ReactElement[] => (
    names.map((name) => (
      <Entity name={name} key={name} />
    ))
  );

  const renderChildren = (status: LoadStatus, names: string[], message: string): ReactElement => {
    if (status === 'SUCCESS') {
      return (
        <div>
          { renderEntities(names) }
        </div>
      );
    }

    return (
      <div>
        <p>{ message }</p>
      </div>
    );
  };

  return (
    <div>
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => changeHandler(event)}
      >
        <option selected disabled> Choose a database</option>
        {
          datasources.map(createOption)
        }
      </select>
      <button type="button" onClick={(): void => clickHandler(datasource)}> Fetch </button>
      {
        renderChildren(entitiesLoadStatus, entityNames, entitiesLoadMessage)
      }
    </div>
  );
};

const mapStateToProps = ({ datasourceData, entitiesData }: StoreType): StoreProps => ({
  datasources: datasourceData.datasources,
  entitiesLoadStatus: entitiesData.entitiesLoadStatus,
  entitiesLoadMessage: entitiesData.entitiesLoadMessage,
  entityNames: entitiesData.entities,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (name: string): void => {
    if (name !== '') dispatch(apiEntitiesFetchAfterChoose(name));
  },
});

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);

export default Sidebar;
