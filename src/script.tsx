import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import store from './store/root-store';
import { apiDatabaseFetch } from './store/api/database/dispatchers';

const Root = (): ReactElement => (
  <Provider store={store}>
    <App />
  </Provider>
);

store.dispatch(apiDatabaseFetch());

ReactDOM.render(<Root />, document.getElementById('root'));
