// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoginButton from './LoginButton';
import UserMenu from './UserMenu';

type Props = {
  classes: Object,
};

type State = {
  connected: boolean,
};

class NavBar extends React.Component<Props, State> {
  static defaultProps = {};

  state = {
    connected: true,
  };

  render() {
    const { classes } = this.props;
    const { connected } = this.state;
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Ns Group Finder
          </Typography>
          {connected ? <UserMenu /> : <LoginButton />}
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

export default withStyles(styles)(NavBar);
