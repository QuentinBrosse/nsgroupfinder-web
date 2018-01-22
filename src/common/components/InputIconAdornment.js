// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { InputAdornment } from 'material-ui/Input';

type Props = {
  classes: Object,
  iconName: string,
  position?: 'start' | 'end',
};

const InputIconAdornment = ({ position, classes, iconName }: Props): Node => (
  <InputAdornment position={position} classes={{ root: classes.root }}>
    <Icon className={classes.icon}>{iconName}</Icon>
  </InputAdornment>
);

InputIconAdornment.defaultProps = {
  position: 'start',
};

const styles = {
  root: {
    height: [30, '!important'],
    alignSelf: 'flex-end',
  },
  icon: {
    fontSize: 24,
  },
};

export default withStyles(styles)(InputIconAdornment);
