// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link, NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import UserMenu from './UserMenu';

type Props = {
  classes: Object,
};

type State = {};

class NavBar extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            type="title"
            color="inherit"
            className={classes.appName}
            component={Link}
            to="/"
          >
            NS Group Finder
          </Typography>

          <Button color="inherit" component={NavLink} to="/create-group">
            Create a Group
          </Button>
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = ({ breakpoints, typography }) => ({
  appName: {
    marginRight: 'auto',
    textDecoration: 'none',
    [breakpoints.down('xs')]: {
      fontSize: typography.pxToRem(13),
    },
  },
});

export default withStyles(styles)(NavBar);
