// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { InputAdornment } from 'material-ui/Input';

type Props = {
  classes: Object,
  iconName: string,
};

const InputIconAdornment = ({ classes, iconName }: Props): Node => (
  <InputAdornment position="start" className={classes.adornment}>
    <Icon className={classes.icon}>{iconName}</Icon>
  </InputAdornment>
);

InputIconAdornment.defaultProps = {};

const styles = {
  adornment: {
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 24,
  },
};

export default withStyles(styles)(InputIconAdornment);
