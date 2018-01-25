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

class RequestDialogPending extends React.Component<Props, State> {
  static defaultProps = {};

  render() {
    const { classes, opened, onClose } = this.props;
    return (
      <Dialog
        open={opened}
        onClose={onClose}
        aria-labelledby="RequestDialogPending"
      >
        <DialogTitle id="RequestDialogPending">
          Your request is pending
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            You request is pending, you have to wait that the group creator
            respond to your request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Thanks
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

export default withStyles(styles)(RequestDialogPending);
