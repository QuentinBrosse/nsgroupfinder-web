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
  viewGroup: Function,
};

const RequestDialogConfirmed = ({
  classes,
  opened,
  onClose,
  viewGroup,
}: Props): Node => (
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
      <Button onClick={viewGroup} color="primary">
        View the Group
      </Button>
    </DialogActions>
  </Dialog>
);

RequestDialogConfirmed.defaultProps = {};

const styles = ({ spacing }) => ({
  dialogContentText: {
    marginBottom: spacing.unit,
  },
});

export default withStyles(styles)(RequestDialogConfirmed);
