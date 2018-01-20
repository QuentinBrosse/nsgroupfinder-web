// @flow

import React from 'react';
import { Provider } from 'react-redux';
import type { Node } from 'react';
import createStore from 'utils/createStore';
import Reboot from 'material-ui/Reboot';
import Home from 'views/Home';
import { Snackbar } from 'common/containers';

const store = createStore();

const App = (): Node => (
  <Provider store={store}>
    <div>
      <Reboot />
      <Home />
      <Snackbar />
    </div>
  </Provider>
);

export default App;
