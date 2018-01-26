// @flow

import React from 'react';
import type { Node } from 'react';
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

const RequestDialogPending = ({ classes, opened, onClose }: Props): Node => (
  <Dialog
    open={opened}
    onClose={onClose}
    aria-labelledby="RequestDialogPending"
  >
    <DialogTitle id="RequestDialogPending">Your request is pending</DialogTitle>
    <DialogContent>
      <DialogContentText className={classes.dialogContentText}>
        You request is pending, you have to wait that the group creator respond
        to your request.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Thanks
      </Button>
    </DialogActions>
  </Dialog>
);

RequestDialogPending.defaultProps = {};

const styles = ({ spacing }) => ({
  dialogContentText: {
    marginBottom: spacing.unit,
  },
});

export default withStyles(styles)(RequestDialogPending);
