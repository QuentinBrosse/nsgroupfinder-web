// @flow

import React from 'react';
import type { Node } from 'react';
import { withFirebase } from 'react-redux-firebase';
import { isConnected } from 'utils/user';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  classes: Object,
  component: Node,
  firebase: Object,
  location: Object,
};

const PrivateRoute = ({
  firebase,
  component: Component,
  location,
  ...rest
}: Props): Node => (
  <Route
    {...rest}
    render={props => {
      if (isConnected(firebase.auth)) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }}
  />
);

PrivateRoute.defaultProps = {};

export default withFirebase(PrivateRoute);
