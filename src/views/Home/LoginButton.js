// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

type Props = {
  classes: Object,
};

const LoginButton = ({ classes }: Props): Node => (
  <Button className={classes.button} color="inherit">
    Login
  </Button>
);

LoginButton.defaultProps = {};

const styles = {
  button: {},
};

export default withStyles(styles)(LoginButton);
