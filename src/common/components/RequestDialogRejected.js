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

const RequestDialogRejected = ({ classes, opened, onClose }: Props): Node => (
  <Dialog
    open={opened}
    onClose={onClose}
    aria-labelledby="RequestDialogRejected"
  >
    <DialogTitle id="RequestDialogRejected">Rejected request</DialogTitle>
    <DialogContent>
      <DialogContentText className={classes.dialogContentText}>
        Your request has been rejected, maybe because the group is already full,
        sorry for that{' '}
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

RequestDialogRejected.defaultProps = {};

const styles = ({ spacing }) => ({
  dialogContentText: {
    marginBottom: spacing.unit,
  },
});

export default withStyles(styles)(RequestDialogRejected);
