// @flow

import React from 'react';
import type { Node } from 'react';
import logoUrl from 'assets/svg/nsgroupfinder-logo.svg';

type Props = {
  size?: number | 50,
};

const NSGroupFinderLogo = ({ size }: Props): Node => {
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

export default NSGroupFinderLogo;
