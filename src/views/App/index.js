// @flow

import React from 'react';
import type { Node } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'views/Home';
import CreateGroup from 'views/CreateGroup';
import MyGroups from 'views/MyGroups';
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
            <Route exact path="/my-groups" component={MyGroups} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

App.defaultProps = {};

const styles = ({ spacing }) => ({
  container: {
    padding: spacing.unit * 2,
    paddingTop: spacing.unit * 4,
  },
});

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: 'members',
      storeAs: 'memberships',
      where: [['user.uid', '==', props.auth.uid], ['obsolete', '==', false]],
    },
  ])
)(App);
