// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from 'material-ui/styles';
import { RequestState } from 'types/groups';
import IconButton from 'material-ui/IconButton';
import HourglassEmptyIcon from 'material-ui-icons/HourglassEmpty';
import CheckIcon from 'material-ui-icons/Check';
import FavoriteIcon from 'material-ui-icons/Favorite';
import DoNotDisturbOnIcon from 'material-ui-icons/DoNotDisturbOn';

type Props = {
  classes: Object,
  requestState: RequestState,
};

const getIcon = (classes: Object, requestState: RequestState): Node => {
  switch (requestState) {
    case 'pending':
      return <HourglassEmptyIcon className={classes.checkIconPending} />;
    case 'confirmed':
      return <CheckIcon className={classes.checkIconConfirmed} />;
    case 'refused':
      return <DoNotDisturbOnIcon className={classes.checkIconRefused} />;
    default:
      return <FavoriteIcon />;
  }
};

const GroupCardRequestButton = ({ classes, requestState }: Props): Node => (
  <IconButton>{getIcon(classes, requestState)}</IconButton>
);

GroupCardRequestButton.defaultProps = {};

const styles = ({ palette }) => ({
  checkIconPending: {
    color: palette.warning.main,
  },
  checkIconConfirmed: {
    color: palette.success.main,
  },
  checkIconRefused: {
    color: palette.error.main,
  },
});

export default withStyles(styles)(GroupCardRequestButton);
