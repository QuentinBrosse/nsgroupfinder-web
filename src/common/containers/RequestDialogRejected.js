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

type Props = {
  classes: Object,
  opened: boolean,
  onClose: Function,
};

type State = {};

class RequestDialogRejected extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { classes, opened, onClose } = this.props;
    return (
      <Dialog
        open={opened}
        onClose={onClose}
        aria-labelledby="RequestDialogRejected"
      >
        <DialogTitle id="RequestDialogRejected">Rejected request</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Your request has been rejected, maybe because the group is already
            full, sorry for that{' '}
            <span role="img" aria-label="Sad emojy">
              😔
            </span>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Ok..
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

export default withStyles(styles)(RequestDialogRejected);
