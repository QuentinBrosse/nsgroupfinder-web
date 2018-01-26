// @flow

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
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
  sendRequest: Function,
};

type State = {
  message: string,
};

class RequestDialogRequest extends React.Component<Props, State> {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  state = {
    message: '',
  };

  handleMessageChange: Function;

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    const { classes, opened, onClose, sendRequest } = this.props;
    const { message } = this.state;

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
            onChange={this.handleMessageChange}
            value={message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => sendRequest(message)} color="primary">
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

export default withStyles(styles)(RequestDialogRequest);
