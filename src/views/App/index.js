// @flow

import React from 'react';
import { Provider } from 'react-redux';
import type { Node } from 'react';
import createStore from 'utils/createStore';
import Home from 'views/Home';

const store = createStore();

const App = (): Node => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
