// @flow

import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'views/Home';
import CreateGroup from 'views/CreateGroup';
import { isConnected } from 'utils/user';
import NavBar from './NavBar';

type Props = {
  classes: Object,
  auth: Object,
};

const App = ({ classes, auth }: Props): Node => {
  if (!isConnected(auth)) {
    return <Redirect to="/login" />;
  }
  return (
    <Router basename="/app">
      <div>
        <NavBar />
        <div className={classes.container}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create-group" component={CreateGroup} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

App.defaultProps = {};

const styles = {
  container: {
    padding: 20,
  },
};

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(mapStateToProps)
)(App);
