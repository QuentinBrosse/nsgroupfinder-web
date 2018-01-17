// @flow

import React from 'react';
import { Provider } from 'react-redux';
import type { Node } from 'react';
import Reboot from 'material-ui/Reboot';
import createStore from 'utils/createStore';
import Home from 'views/Home';

const store = createStore();

const App = (): Node => (
  <Provider store={store}>
    <div>
      <Reboot />
      <Home />
    </div>
  </Provider>
);

export default App;
