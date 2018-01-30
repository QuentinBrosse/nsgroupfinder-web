// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

type Props = {
  classes: Object,
  link: string,
  name: string,
};

const FacebookIndicator = ({ classes, link, name }: Props): Node => (
  <Typography
    className={classes.link}
    component="a"
    href={link}
    target="_blank"
    noWrap
  >
    {name}
  </Typography>
);

FacebookIndicator.defaultProps = {};

const styles = {
  link: {},
};

export default withStyles(styles)(FacebookIndicator);
