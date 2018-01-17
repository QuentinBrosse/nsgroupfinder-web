// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';

type Props = {
  classes: Object,
};

const Test = ({ classes }: Props): Node => (
  <h1 className={classes.test}>Bonjour</h1>
);

Test.defaultProps = {};

const styles = {
  test: {
    color: 'red',
  },
};

export default withStyles(styles)(Test);
