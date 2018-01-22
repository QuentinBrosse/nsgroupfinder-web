// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

type Props = {
  classes: Object,
  children: Node,
};

const GroupCardContainer = ({ classes, children }: Props): Node => (
  <Grid container className={classes.container}>
    {React.Children.map(children, child => (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {child}
      </Grid>
    ))}
  </Grid>
);

GroupCardContainer.defaultProps = {};

const styles = {
  container: {},
};

export default withStyles(styles)(GroupCardContainer);
