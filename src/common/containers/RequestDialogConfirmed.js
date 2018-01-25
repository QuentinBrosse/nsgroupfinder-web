// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Redirect } from 'react-router-dom';

type Props = {
  classes: Object,
  opened: boolean,
  onClose: Function,
};

type State = {
  redirectToGroup: boolean,
};

class RequestDialogConfirmed extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.redirectToGroup = this.redirectToGroup.bind(this);
  }

  state = {
    redirectToGroup: false,
  };

  redirectToGroup: Function;

  redirectToGroup() {
    this.setState({ redirectToGroup: true });
  }

  render() {
    const { classes, opened, onClose } = this.props;
    const { redirectToGroup } = this.state;
    if (redirectToGroup) {
      return <Redirect to="/create-group" />;
    }
    return (
      <Dialog
        open={opened}
        onClose={onClose}
        aria-labelledby="RequestDialogConfirmed"
      >
        <DialogTitle id="RequestDialogConfirmed">
          Your request is already confirmed
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            You are already member of this group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={this.redirectToGroup} color="primary">
            View the Group
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = ({ spacing }) => ({
  dialogContentText: {
    marginBottom: spacing.unit,
  },
});

export default withStyles(styles)(RequestDialogConfirmed);
