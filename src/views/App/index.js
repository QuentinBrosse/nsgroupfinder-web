// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import createStore from 'utils/createStore';
import Reboot from 'material-ui/Reboot';
import Home from 'views/Home';
import { Snackbar } from 'common/containers';
import NavBar from './NavBar';

type Props = {
  classes: Object,
};

const store = createStore();

const App = ({ classes }: Props): Node => (
  <Provider store={store}>
    <div>
      <Reboot />
      <NavBar />
      <div className={classes.container}>
        <Home />
      </div>
      <Snackbar />
    </div>
  </Provider>
);

App.defaultProps = {};

const styles = {
  container: {
    padding: '20px',
  },
};

export default withStyles(styles)(App);
