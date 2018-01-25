// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
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
  dThrowDissmissSnackbar: Function,
  dThrowAccentSnackbar: Function,
};

type State = {};

class RequestDialogRequest extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest: Function;

  sendRequest() {
    const { onClose, dThrowAccentSnackbar } = this.props;
    dThrowAccentSnackbar(`Your request has been sent to the group creator !`);
    onClose();
  }

  render() {
    const { classes, opened, onClose } = this.props;
    return (
      <Dialog
        open={opened}
        onClose={onClose}
        aria-labelledby="RequestDialogRequest"
      >
        <DialogTitle id="RequestDialogRequest">
          Ask to join the group
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Your request may be accepted or rejected by the creator of the
            group.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            helperText="A nice message for the creator of the group."
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendRequest} color="primary">
            Send
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

const mapDispatchToProps = {
  dThrowDissmissSnackbar: throwDissmissSnackbar,
  dThrowAccentSnackbar: throwAccentSnackbar,
};

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(
  RequestDialogRequest
);
