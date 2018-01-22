// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import createStore from 'utils/createStore';
import Reboot from 'material-ui/Reboot';
import Snackbar from './Snackbar';
import MainRooter from './MainRooter';

const store = createStore();

const Root = (): Node => (
  <Provider store={store}>
    <div>
      <Reboot />
      <MainRooter />
      <Snackbar />
    </div>
  </Provider>
);
Root.defaultProps = {};

export default Root;
