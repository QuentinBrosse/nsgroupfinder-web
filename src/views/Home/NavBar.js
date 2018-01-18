// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

/*
type Props = {
  classes: Object,
};
*/

const NavBar = (/* { classes }: Props */): Node => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography type="title">Ns Group Finder</Typography>
    </Toolbar>
  </AppBar>
);

NavBar.defaultProps = {};

const styles = {};

export default withStyles(styles)(NavBar);
