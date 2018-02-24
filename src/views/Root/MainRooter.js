// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, firebaseConnect } from 'react-redux-firebase';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from 'common/containers';
import ShareGroup from 'views/ShareGroup';
import App from 'views/App';
import LogIn from 'views/LogIn';
import CircularProgress from 'material-ui/Progress/CircularProgress';

type Props = {
  classes: Object,
  auth: Object,
};

const MainRooter = ({ classes, auth }: Props): Node => {
  if (!isLoaded(auth)) {
    return (
      <div className={classes.globalProgress}>
        <CircularProgress size={50} />
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/app" component={App} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/s/:groupId" component={ShareGroup} />
        <Redirect to="/app" />
      </Switch>
    </Router>
  );
};

MainRooter.defaultProps = {};

const styles = {
  globalProgress: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

export default compose(
  withStyles(styles),
  firebaseConnect(),
  connect(mapStateToProps)
)(MainRooter);
