// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import type { Node } from 'react';
import type { RequestStatus } from 'types/group';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { Redirect } from 'react-router-dom';
import { logErrorIfDevEnv } from 'utils/env';
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
import { getUserFromAuth } from 'utils/user';
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
  adminUid: string,
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
  firestore: Object,
  auth: Object,
};

type State = {
  dialogOpen: boolean,
  redirectTo: null | string,
};

class GroupCardRequestButton extends React.Component<Props, State> {
  static defaultProps = {
    requestStatus: 'default',
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

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
      default:
        return {
          icon: <GroupAddIcon />,
          dialog: (
            <RequestDialogRequest
              groupId={groupId}
              opened={dialogOpen}
              onClose={this.handleCloseDialog}
              sendRequest={this.sendRequest}
            />
          ),
          tooltip: 'Join the group !',
        };
    }
  }

  handleClick: Function;
  handleCloseDialog: Function;
  redirectTo: Function;
  sendRequest: Function;

  handleClick() {
    const { requestStatus, groupId } = this.props;
    if (requestStatus !== 'admin') {
      this.setState({ dialogOpen: true });
    } else {
      this.redirectTo(`/group/${groupId}`);
    }
  }

  handleCloseDialog() {
    this.setState({ dialogOpen: false });
  }

  redirectTo(route: string) {
    this.setState({ redirectTo: route });
  }

  async sendRequest(message: string, ticketUnits: number) {
    const {
      dThrowAccentSnackbar,
      dThrowDissmissSnackbar,
      firestore,
      groupId,
      adminUid,
      auth,
    } = this.props;
    const db = getFirebase().firestore();
    try {
      const groupRef = db.collection('groups').doc(groupId);
      const membersRef = db.collection('members').doc();
      await db.runTransaction(async transaction => {
        const group = await transaction.get(groupRef);
        if (!group.exists) {
          dThrowAccentSnackbar('Ooops, this group does not exist.');
          throw new Error('Document does not exist!');
        }
        const { obsolete: groupObsolete, pendingRequests } = group.data();
        transaction.update(groupRef, { pendingRequests: pendingRequests + 1 });

        const payload = {
          user: getUserFromAuth(auth),
          groupId,
          adminUid,
          status: 'pending',
          message,
          createdAt: firestore.FieldValue.serverTimestamp(),
          confirmedAt: null,
          obsolete: groupObsolete,
          paid: false,
          ticketUnits: parseInt(ticketUnits, 10) || 1,
        };
        transaction.set(membersRef, payload);
      });
      dThrowDissmissSnackbar(
        'Your request has been sent to the group creator !'
      );
      this.setState({ dialogOpen: false });
    } catch (err) {
      logErrorIfDevEnv(err);
      dThrowAccentSnackbar('Ooops, try again later please :/');
    }
  }

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

const mapPropsToState = ({ firebase }) => ({
  auth: firebase.auth,
});

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(
  firestoreConnect(),
  withStyles(styles),
  connect(mapPropsToState, mapDispatchToProps)
)(GroupCardRequestButton);
