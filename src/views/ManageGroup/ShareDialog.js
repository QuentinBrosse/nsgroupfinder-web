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
  groupId: string,
};

const ShareDialog = ({ classes, opened, onClose, groupId }: Props): Node => {
  const shareLink = `https://nsgroupfinder.nl/s/${groupId}`;
  return (
    <Dialog open={opened} onClose={onClose} aria-labelledby="ShareDialog">
      <DialogTitle id="ShareDialog">Share the Group</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogContentText}>
          Copy this link and paste it anywhere you want to share it!
          <br />
          <a href={shareLink} target="_blanck" className={classes.link}>
            {shareLink}
          </a>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShareDialog.defaultProps = {};

const styles = ({ spacing, typography }) => ({
  dialogContentText: {
    textAlign: 'center',
  },
  link: {
    display: 'block',
    marginTop: spacing.unit * 2,
    fontFamily: ['Menlo', 'monospace'],
    fontSize: typography.fontSize,
  },
});

export default withStyles(styles)(ShareDialog);
