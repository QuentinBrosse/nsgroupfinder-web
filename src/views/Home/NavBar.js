// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from 'material-ui/styles';
import { isConnected } from 'utils/user';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LogInButton from './LogInButton';
import UserMenu from './UserMenu';

type Props = {
  classes: Object,
  auth: Object,
};

type State = {};

class NavBar extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { auth, classes } = this.props;
    const connected = isConnected(auth);
    console.log('Auth', auth);
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            NS Group Finder
          </Typography>
          {connected ? <UserMenu /> : <LogInButton />}
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = {
  flex: {
    flex: 1,
  },
};

export default compose(
  firebaseConnect(),
  withStyles(styles),
  connect(
    // Map state to props
    ({ firebase: { auth } }) => ({
      auth,
    })
  )
)(NavBar);
