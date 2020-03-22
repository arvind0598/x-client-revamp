import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../models/app/store';
import { apiDatabaseChoose } from '../../store/api/database/dispatchers';

type StoreProps = {
  datasources: string[];
};

type DispatchProps = {
  clickHandler: Function;
}

type Props = StoreProps & DispatchProps;

const createOption = (option: string, index: number): ReactElement => (
  <option key={index} value={option}>{ option }</option>
);

const SidebarComponent = ({ datasources, clickHandler }: Props): ReactElement => {
  const [datasource, setDatasource] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedSource = event.target.value;
    setDatasource(selectedSource);
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
    </div>
  );
};

const mapStateToProps = ({ datasourceData }: StoreType): StoreProps => ({
  datasources: datasourceData.datasources,
});

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  clickHandler: (name: string): void => {
    if (name !== '') dispatch(apiDatabaseChoose(name));
  },
});

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);

export default Sidebar;
