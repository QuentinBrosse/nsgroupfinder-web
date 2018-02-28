// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import getStore from 'utils/getStore';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import themeConfig from 'config/theme';
import Snackbar from './Snackbar';
import MainRooter from './MainRooter';

const store = getStore();
const theme = createMuiTheme(themeConfig);

const Root = (): Node => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <MainRooter />
      <Snackbar />
    </MuiThemeProvider>
  </Provider>
);
Root.defaultProps = {};

export default Root;
