// @flow

import React from 'react';
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
import ManageGroup from 'views/ManageGroup';
import { isConnected } from 'utils/user';
import isEmpty from 'lodash/isEmpty';
import NavBar from './NavBar';

type Props = {
  classes: Object,
  auth: Object,
  location: Object,
  firestore: Object,
};

type State = {};

class App extends React.Component<Props, State> {
  static defaultProps = {};

  componentWillMount() {
    const { auth, firestore } = this.props;
    if (!auth.uid) {
      return;
    }
    this.listener = {
      collection: 'members',
      storeAs: 'memberships',
      where: [['user.uid', '==', auth.uid], ['obsolete', '==', false]],
    };
    firestore.setListener(this.listener);
  }

  componentWillUnmount() {
    if (!isEmpty(this.listener)) {
      const { firestore } = this.props;
      firestore.unsetListener(this.listener);
    }
  }

  listener = {};

  render() {
    const { classes, auth, location } = this.props;
    const { pathname: returnTo } = location;
    if (!isConnected(auth)) {
      const redirectLocation = {
        pathname: '/login',
        state: { returnTo },
      };
      return <Redirect to={redirectLocation} />;
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
              <Route exact path="/group/:groupId" component={ManageGroup} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

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
  firestoreConnect(),
  connect(mapStateToProps)
)(App);
