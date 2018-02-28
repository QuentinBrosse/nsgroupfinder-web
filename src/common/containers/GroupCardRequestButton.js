// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { RequestStatus } from 'types/group';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  RequestDialogConfirmed,
  RequestDialogRejected,
  RequestDialogPending,
} from 'common/components';
import IconButton from 'material-ui/IconButton';
import HourglassEmptyIcon from 'material-ui-icons/HourglassEmpty';
import CheckIcon from 'material-ui-icons/Check';
import DoNotDisturbOnIcon from 'material-ui-icons/DoNotDisturbOn';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Tooltip from 'material-ui/Tooltip';
import { withFetch } from 'common/containers';
import { throwDissmissSnackbar } from 'actions/snackbar';
import RequestDialogRequest from './RequestDialogRequest';

type RequestComponents = {
  icon: Node,
  dialog: Node,
  tooltip: string,
};

type Props = {
  classes: Object,
  requestStatus?: RequestStatus,
  groupId: string,
  dThrowDissmissSnackbar: typeof throwDissmissSnackbar,
};

type State = {
  dialogOpen: boolean,
  redirectTo: null | string,
};

class GroupCardRequestButton extends React.Component<Props, State> {
  static defaultProps = {
    requestStatus: 'default',
  };

  state = {
    dialogOpen: false,
    redirectTo: null,
  };

  get requestComponents(): RequestComponents {
    const { classes, groupId, requestStatus } = this.props;
    const { dialogOpen } = this.state;
    switch (requestStatus) {
      case 'pending':
        return {
          icon: <HourglassEmptyIcon className={classes.iconPending} />,
          dialog: (
            <RequestDialogPending
              opened={dialogOpen}
              onClose={this.handleCloseDialog}
            />
          ),
          tooltip: 'Pending..',
        };
      case 'confirmed':
        return {
          icon: <CheckIcon className={classes.iconConfirmed} />,
          dialog: (
            <RequestDialogConfirmed
              opened={dialogOpen}
              onClose={this.handleCloseDialog}
              viewGroup={() => this.redirectTo(`/group/${groupId}`)}
            />
          ),
          tooltip: 'Request accepted !',
        };
      case 'refused':
        return {
          icon: <DoNotDisturbOnIcon className={classes.iconRefused} />,
          dialog: (
            <RequestDialogRejected
              opened={dialogOpen}
              onClose={this.handleCloseDialog}
            />
          ),
          tooltip: 'Request rejected..',
        };
      case 'admin':
        return {
          icon: <ModeEditIcon />,
          dialog: null,
          tooltip: 'Edit your group',
        };
      default: {
        const FetchRequestDialogRequest = withFetch(RequestDialogRequest, {
          onSuccess: this.handleRequestSent,
        });
        return {
          icon: <GroupAddIcon />,
          dialog: (
            <FetchRequestDialogRequest
              groupId={groupId}
              opened={dialogOpen}
              onClose={this.handleCloseDialog}
            />
          ),
          tooltip: 'Join the group !',
        };
      }
    }
  }

  handleClick = () => {
    const { requestStatus, groupId } = this.props;
    if (requestStatus !== 'admin') {
      this.setState({ dialogOpen: true });
    } else {
      this.redirectTo(`/group/${groupId}`);
    }
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  redirectTo = (route: string) => {
    this.setState({ redirectTo: route });
  };

  handleRequestSent = () => {
    const { dThrowDissmissSnackbar } = this.props;
    const successMessage = 'Your request has been sent to the group creator !';
    this.handleCloseDialog();
    dThrowDissmissSnackbar(successMessage);
  };

  render() {
    const { icon, dialog, tooltip } = this.requestComponents;
    const { redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} push />;
    }
    return (
      <div>
        <Tooltip id="tooltip-icon" title={tooltip} placement="left">
          <IconButton onClick={this.handleClick}>{icon}</IconButton>
        </Tooltip>
        {dialog}
      </div>
    );
  }
}

const styles = ({ palette }) => ({
  iconPending: {
    color: palette.warning.main,
  },
  iconConfirmed: {
    color: palette.success.main,
  },
  iconRefused: {
    color: palette.error.main,
  },
});

const mapDispatchToProos = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProos))(
  GroupCardRequestButton
);
