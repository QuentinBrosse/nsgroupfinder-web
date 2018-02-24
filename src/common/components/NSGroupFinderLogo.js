// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import logoUrl from 'assets/svg/nsgroupfinder-logo.svg';

type Props = {
  classes: Object,
  size?: number | 50,
};

const NSGroupFinderLogo = ({ classes, size }: Props): Node => {
  const style = {
    height: size,
    width: size,
    borderRadius: size / 2,
  };
  return <img src={logoUrl} alt="NS Group Finder" style={style} />;
};

NSGroupFinderLogo.defaultProps = {
  size: 50,
};

const styles = {};

export default withStyles(styles)(NSGroupFinderLogo);
