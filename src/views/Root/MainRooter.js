// @flow

import React from 'react';
import type { Node } from 'react';
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
import App from 'views/App';
import LogIn from 'views/LogIn';

type Props = {
  auth: Object,
};

const MainRooter = ({ auth }: Props): Node => {
  if (!isLoaded(auth)) {
    return 'Loading....';
  }
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/app" component={App} />
        <Route exact path="/login" component={LogIn} />
        <Redirect to="/app" />
      </Switch>
    </Router>
  );
};

MainRooter.defaultProps = {};

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth,
});

export default compose(firebaseConnect(), connect(mapStateToProps))(MainRooter);
