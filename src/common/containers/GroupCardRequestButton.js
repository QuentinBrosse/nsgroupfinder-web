// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { RequestState } from 'types/groups';
import IconButton from 'material-ui/IconButton';
import HourglassEmptyIcon from 'material-ui-icons/HourglassEmpty';
import CheckIcon from 'material-ui-icons/Check';
import FavoriteIcon from 'material-ui-icons/Favorite';
import DoNotDisturbOnIcon from 'material-ui-icons/DoNotDisturbOn';
import RequestDialogRequest from './RequestDialogRequest';

type Props = {
  classes: Object,
  requestState?: RequestState,
};

type State = {
  dialogOpen: boolean,
};

class GroupCardRequestButton extends React.Component<Props, State> {
  static defaultProps = {
    requestState: 'default',
  };

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    dialogOpen: false,
  };

  get actions(): Object {
    const { classes } = this.props;
    const { dialogOpen } = this.state;
    return {
      default: {
        icon: <FavoriteIcon />,
        dialog: (
          <RequestDialogRequest
            opened={dialogOpen}
            onClose={this.handleClose}
          />
        ),
      },
      pending: {
        icon: <HourglassEmptyIcon className={classes.checkIconPending} />,
        dialog: (
          <RequestDialogRequest
            opened={dialogOpen}
            onClose={this.handleClose}
          />
        ),
      },
      confirmed: {
        icon: <CheckIcon className={classes.checkIconConfirmed} />,
        dialog: (
          <RequestDialogRequest
            opened={dialogOpen}
            onClose={this.handleClose}
          />
        ),
      },
      refused: {
        icon: <DoNotDisturbOnIcon className={classes.checkIconRefused} />,
        dialog: (
          <RequestDialogRequest
            opened={dialogOpen}
            onClose={this.handleClose}
          />
        ),
      },
    };
  }

  get icon(): Node {
    const { classes, requestState } = this.props;
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
  }

  handleOpen: Function;
  handleClose: Function;

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const { requestState } = this.props;
    const { icon, dialog } = this.actions[requestState];
    return (
      <div>
        <IconButton onClick={this.handleOpen}>{icon}</IconButton>
        {dialog}
      </div>
    );
  }
}

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
