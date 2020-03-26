import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/root-store';
import { apiDatabaseFetch } from './store/api/database/services';
import DndContext from './components/dnd-context/dnd-context';

const Root = (): ReactElement => (
  <Provider store={store}>
    <DndContext />
  </Provider>
);

store.dispatch(apiDatabaseFetch());

ReactDOM.render(<Root />, document.getElementById('root'));
